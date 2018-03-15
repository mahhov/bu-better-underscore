const gitApi = require('./gitApi');
const _ = require('underscore');

let users = [
    {name: 'johnny', 'description': 'the boss'},
    {name: 'jacob', 'description': 'bad employee #1'}];


let getUnReviewedPullRequests = async (users) => {
    
    _.chain(
        await Promise.all(
            _.chain(users)
                .pluck('name')
                .map(gitApi.getRepos)
                .value()))
        .pluck('data')
        .flatten()
        .unique(repo => repo.id)
        .each(async repo => {
            _.chain(
                (await gitApi.getPullRequests(repo.id))
                    .data)
                .each(async pullRequest => {
                    let inProgress = !!(await gitApi.getReviews(repo.id, pullRequest.number))
                        .data
                        .length;
                    console.log(`repo ${repo.name} : ${pullRequest.title} (${pullRequest.number}) inProgress: ${inProgress}`);
                });
        });
};

getUnReviewedPullRequests(users);