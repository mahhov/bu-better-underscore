const gitApi = require('./gitApi');
const b_ = require('../src/index');

const users = [
    {name: 'johnny', 'description': 'the boss'},
    {name: 'jacob', 'description': 'bad employee #1'}];


let getUnReviewedPullRequests = async (users) => {
    users = b_(users);

    let repos = b_(await
        users
            .pluck('name')
            .map(gitApi.getRepos)
            .asList(Promise.all.bind(Promise)))
        .pluck('data')
        .flatten()
        .unique(repo => repo.id);

    let pullRequests = b_(await
        repos
            .pluck('id')
            .map(gitApi.getPullRequests)
            .asList(Promise.all.bind(Promise)))
        .pluck('data')
        .each((pullRequestsOfRepo, index) => {
            b_(pullRequestsOfRepo).set('repo', pullRequest => repos.unwrap()[index])
        }).flatten();

    let reviews = b_(await
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