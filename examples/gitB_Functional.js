const gitApi = require('./gitApi');
const B_ = require('../src/index');

const users = [
    {name: 'johnny', 'description': 'the boss'},
    {name: 'jacob', 'description': 'bad employee #1'}];


let getUnReviewedPullRequests = async (users) => {
    users = new B_(users);

    let repos = new B_(await
        users
            .pluck('name')
            .map(gitApi.getRepos)
            .asList(Promise.all.bind(Promise)))
        .pluck('data')
        .flatten()
        .unique(repo => repo.id);

    let pullRequests = new B_(await
        repos
            .pluck('id')
            .map(gitApi.getPullRequests)
            .asList(Promise.all.bind(Promise)))
        .pluck('data')
        .each((pullRequestsOfRepo, index) => {
            new B_(pullRequestsOfRepo).set('repo', pullRequest => repos.unwrap()[index])
        }).flatten();

    let reviews = new B_(await
        pullRequests
            .map(pullRequest => gitApi.getReviews(pullRequest.repo.id, pullRequest.number))
            .asList(Promise.all.bind(Promise)))
        .pluck('data');

    pullRequests
        .set('inProgress', (pullRequest, index) => !!reviews.unwrap()[index].length)
        .map(pullRequest => `repo ${pullRequest.repo.name} : ${pullRequest.title} (${pullRequest.number}) inProgress: ${pullRequest.inProgress}`)
        .each(pullRequest => {
            console.log(pullRequest)
        });
};

getUnReviewedPullRequests(users);