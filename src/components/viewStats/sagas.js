// import the required modules from npm
import { takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';

import { LOAD_VOTERS, LOAD_CANDIDATES } from './actionTypes';
import { WAIT_TIME } from './constants';
import actions from './actions';

// import custom items
const getElectionInterface = require('../../web3/election');

function* loadVoters(action) {
    const indexes = [];
    const electionAddress = action.payload;
    const electionInterface = yield getElectionInterface(electionAddress);
    try {
        const voterArrayLength = yield electionInterface.methods.getVotersLength().call();
        for (let i = 0; i < voterArrayLength; indexes.push(i += 1));
        const voterDetails = yield Promise.all(
            indexes.map((_, index) => (electionInterface.methods.voters(index).call()))
        );
        yield put(actions.pushVoters(voterDetails));
    } catch (err) {
        message.error(err.message, WAIT_TIME);
    }
}

function* loadCandidates(action) {
    const electionAddress = action.payload;
    const electionInterface = yield getElectionInterface(electionAddress);
    // get the length of the candidates in this election
    try {
        const candidateArrayLength = yield electionInterface.methods.getCandidatesLength().call();
        // this line call gives us the range from zero to a number 4=>[0,1,2,3]
        const indexes = [...Array(Number(candidateArrayLength)).keys()];
        // get all the candidates from the contract
        const candidateDetails = yield Promise.all(
            indexes.map((_, index) => electionInterface.methods.candidates(index).call())
        );
        // add this candidate to the array
        yield put(actions.pushCandidates(candidateDetails));
    } catch (err) {
        message.error(err.message, WAIT_TIME);
    }
}

function* validateVotersSaga() {
    yield takeLatest(LOAD_VOTERS, loadVoters);
    yield takeLatest(LOAD_CANDIDATES, loadCandidates);
}

export default validateVotersSaga;