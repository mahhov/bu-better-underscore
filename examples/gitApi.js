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

module.exports = gitApi;