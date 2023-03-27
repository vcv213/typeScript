/*
author: Vasanth Vasili
Date: Mar 17, 2023

Jest Test Suite to test Github APIs around the user object
Suite includes a mock server that is being imported from jest-mock-server.

a) Mock server starts before the TestSuite 
b) Resets before each TestCategory 
c) Stops at the end of TestSuite

TestSuite Coverage:
-------------------
1) Get Authenticated User 
2) Update Authenticated User
3) List Users
4) Get a User
5) Get contextual information for a user

Pre-req:
---------
Install babel preset:
on the cmd terminal: "npm install --save-dev @babel/preset-env"

test suite execution cmd:
------------------------- 
"npm test"

*/

import { MockServer } from 'jest-mock-server';
import fetch from 'node-fetch';
import {json} from "stream/consumers";

describe('Testing node-fetch HTTP client', () => {
  const server = new MockServer();

  //server Ops
  beforeAll(() => server.start());
  afterAll(() => server.stop());
  beforeEach(() => server.reset());


  // GET user
  const user = {
  "login": "octocat",
  "id": 1,
  "node_id": "MDQ6VXNlcjE=",
  "avatar_url": "https://github.com/images/error/octocat_happy.gif",
  "gravatar_id": "",
  "url": "https://api.github.com/users/octocat",
  "html_url": "https://github.com/octocat",
  "followers_url": "https://api.github.com/users/octocat/followers",
  "following_url": "https://api.github.com/users/octocat/following{/other_user}",
  "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
  "organizations_url": "https://api.github.com/users/octocat/orgs",
  "repos_url": "https://api.github.com/users/octocat/repos",
  "events_url": "https://api.github.com/users/octocat/events{/privacy}",
  "received_events_url": "https://api.github.com/users/octocat/received_events",
  "type": "User",
  "site_admin": false,
  "name": "monalisa octocat",
  "company": "GitHub",
  "blog": "https://github.com/blog",
  "location": "San Francisco",
  "email": "octocat@github.com",
  "hireable": false,
  "bio": "There once was...",
  "twitter_username": "monatheoctocat",
  "public_repos": 2,
  "public_gists": 1,
  "followers": 20,
  "following": 0,
  "created_at": "2008-01-14T04:33:35Z",
  "updated_at": "2008-01-14T04:33:35Z",
  "private_gists": 81,
  "total_private_repos": 100,
  "owned_private_repos": 100,
  "disk_usage": 10000,
  "collaborators": 8,
  "two_factor_authentication": true,
  "plan": {
    "name": "Medium",
    "space": 400,
    "private_repos": 20,
    "collaborators": 0
  }
};

// For Listing Users
const users = [
  {
    "login": "octocat",
    "id": 1,
    "node_id": "MDQ6VXNlcjE=",
    "avatar_url": "https://github.com/images/error/octocat_happy.gif",
    "gravatar_id": "",
    "url": "https://api.github.com/users/octocat",
    "html_url": "https://github.com/octocat",
    "followers_url": "https://api.github.com/users/octocat/followers",
    "following_url": "https://api.github.com/users/octocat/following{/other_user}",
    "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
    "organizations_url": "https://api.github.com/users/octocat/orgs",
    "repos_url": "https://api.github.com/users/octocat/repos",
    "events_url": "https://api.github.com/users/octocat/events{/privacy}",
    "received_events_url": "https://api.github.com/users/octocat/received_events",
    "type": "User",
    "site_admin": false
  }
];

  /**************TESTCASES *****************/

  // Testcases: Get User Status codes check: 200, 401, 403

  test('Get User', async () => {
    const route = server
        .get('/user')
        .mockImplementation((ctx) => {
          // debug : 
          console.log(ctx.req.headers);
          if (ctx.req.headers.authorization && ctx.req.headers.authorization == 'BEARER ABD') {
            ctx.status = 200;
            ctx.body = JSON.stringify(user)
          } else if (ctx.req.headers.authorization != undefined  && ctx.req.headers.authorization.length == 0) {
            ctx.status = 403;
          } else {
            ctx.status = 401;
          }
        });

    const url = server.getURL();

    const response1 = await fetch(new URL('/user', server.getURL()), {
      headers: {
        'authorization': 'BEARER ABD'
      }
    });
    const body = await response1.json()
    // debug : 
    console.log('response: ' + JSON.stringify(body))
    expect(response1.status).toBe(200);

    const response2 = await fetch(new URL('/user', server.getURL()));
    expect(response2.status).toBe(401);

    const response3 = await fetch(new URL('/user', server.getURL()), {
      headers: {
        'authorization': ''
      }
    });
    expect(response3.status).toBe(403);

  }, 50000000);


  // Testcases: List User Status codes check: 200, 401, 403

  test('List Users', async () => {
    const route = server
        .get('/users')
        .mockImplementation((ctx) => {
          // debug : 
          console.log(ctx.req.headers);
          console.log("params", ctx.request.url);
          console.log("DEBUG per page Output",ctx.query['per_page']);

          if (ctx.req.headers.authorization && ctx.req.headers.authorization == 'BEARER ABD') {
            ctx.status = 200;
            ctx.body = JSON.stringify(users)
          } else if (ctx.req.headers.authorization && ctx.req.headers.authorization == 'foo') {
            ctx.status = 403;
          } else {
            ctx.status = 401;
          }
        });

    const url = server.getURL();

    var queryurl = new URL(url+'users'), params = {since:5, per_page:10}
    Object.keys(params).forEach(key => queryurl.searchParams.append(key, params[key]))
    console.log (queryurl)
    const response2 = await fetch(queryurl, {
            headers: {
              'authorization': 'BEARER ABD',
              'accept': 'application/vnd.github+json',
            }
      });

    const body_all = await response2.json()
    // debug : 
    console.log('response: ' + JSON.stringify(body_all))
    expect(response2.status).toBe(200);

  }, 50000000);
});