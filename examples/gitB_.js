let gitApi = {
    getRepos: (user) => new Promise(resolve => {
        if (user === 'johnny')
            resolve({
                'data': [
                    {name: 'kangaroo-app', id: 0},
                    {name: 'hippo-app', id: 11},
                    {name: 'flamingo-app', id: 21}]
            });
        else if (user === 'jacob')
            resolve({
                'data': [
                    {name: 'hippo-app', id: 11},
                    {name: 'elephant-app', id: 111}]
            });
    }),

    getPullRequests: repoId => new Promise(resolve => {
        if (repoId === 0)
            resolve({'data': [{title: 'make it blue', number: 1001}]});
        else if (repoId === 11)
            resolve({'data': [{title: 'make it green', number: 502}, {title: 'make it yellow', number: 503}]});
        else if (repoId === 111)
            resolve({'data': [{title: 'make it red', number: 66}]});
        else
            resolve({'data': []});
    }),

    getReviews: (repoId, pullRequestNumber) => new Promise(resolve => {
        resolve({'data': repoId === 0 || repoId === 11 && pullRequestNumber === 502 ? [{reviewId: pullRequestNumber * 3 + repoId}] : []});
    })
};

let users = [
    {name: 'johnny', 'description': 'the boss'},
    {name: 'jacob', 'description': 'bad employee #1'}];

B_ = require('../src/index');

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