const gitApi = require('./gitApi');
const _ = require('underscore');

let users = [
    {name: 'johnny', 'description': 'the boss'},
    {name: 'jacob', 'description': 'bad employee #1'}];


let getUnReviewedPullRequests = async (users) => {
    _.each(
        _.unique(
            _.flatten(
                _.pluck(
                    (await Promise.all(
                        _.map(
                            _.pluck(users, 'name')
                            , gitApi.getRepos))),
                    'data')),
            repo => repo.id)
        , async repo => {
            _.each((await gitApi.getPullRequests(repo.id)).data, async pullRequest => {
                let inProgress = !!(await gitApi.getReviews(repo.id, pullRequest.number)).data.length;
                console.log(`repo ${repo.name} : ${pullRequest.title} (${pullRequest.number}) inProgress: ${inProgress}`);
            });
        });
};

getUnReviewedPullRequests(users);