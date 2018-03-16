const gitApi = require('./gitApi');
require('../src/index').addPrototype();

const users = [
    {name: 'johnny', 'description': 'the boss'},
    {name: 'jacob', 'description': 'bad employee #1'}];

let getUnReviewedPullRequests = async users => {
    (await
        users
            .pluck('name')
            .map(gitApi.getRepos)
            .asList(Promise.all.bind(Promise)))
        .pluck('data')
        .flatten()
        .unique(repo => repo.id)
        .each(async repo => {
            (await gitApi.getPullRequests(repo.id))
                .field('data')
                .each(async pullRequest => {
                    let inProgress = !!(await gitApi.getReviews(repo.id, pullRequest.number))
                        .field('data')
                        .length;
                    console.log(`repo ${repo.name} : ${pullRequest.title} (${pullRequest.number}) inProgress: ${inProgress}`);
                });
        });
};

getUnReviewedPullRequests(users);