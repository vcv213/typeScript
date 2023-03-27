
Goal:
=====
using JEST create a testsuite to test GitHub User object APIs.

Steps to run TestSuite:
========================
1) perform git pull from the github repo user: 'vcv213'. 
2) After pull, On the terminal shell, go to the project folder.
3) Install babel preset:
on the cmd terminal: "npm install --save-dev @babel/preset-env"
4) To run the test suite execute cmd: 
"npm test"

NOTE: The server code is already included in mock.test.ts.

Test Strategies:
================
Since the assignment is incomplete due to limited knowledge in Javascript, for remaining test scenarios,
I mentioned the Test Strategies in the 'TestStrategy' doc incuded in the project repo.


**************
using Python:
***************

Since I had very less familiarity on Javascript and hence tackled lesser cases, I tested few using python's pytest framework.
Copying them in 'python' folder of the repo:

Instructions:
-------------
1) Install Python 3.7 or greater version
2) Create a folder for python project and cd <python_folder>

execute below cmds to install pytest:

bash-3.2$ python -m venv ~/venvs/github_rest
bash-3.2$ source ~/venvs/github_rest/bin/activate
(github_rest) bash-3.2$ pip install pytest

3) Copy the 'python_api_user.py' file into the <pythojn_folder>
4) Cmd to run python pytest suite: "pytest -s python_api_user.py"



References:
===========
1) https://github.com/DanielHreben/jest-mock-server