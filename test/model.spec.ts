"use strict";

import { describe } from "mocha";
import { expect, assert } from "chai";
import * as chai from "chai";
import * as sinon from "sinon";

import { Harness } from "../src/model";

chai.use(require("sinon-chai"));

describe("Harness Scm Classes", () => {

  let uut: Harness.GithubSource;

  beforeEach(() => {
    uut = new Harness.GithubSource();
  });

  ["owner", "repo", "sha", "branch"].forEach((prop) => {
    it(`should report incomplete data on missing ${prop} parameter`, async () => {
      Object.assign(uut, {
        branch: [ "master" ],
        owner: "org",
        repo: "repo",
        sha: "sha"
       } as Harness.GithubSource
      );

      uut[prop] = undefined;

      expect(uut.isDataComplete()).to.be.false;
    });
  });

  it(`should report complete data on valid objects`, async () => {
    Object.assign(uut, {
      branch: [ "master" ],
      owner: "org",
      repo: "repo",
      sha: "sha"
     } as Harness.GithubSource
    );

    expect(uut.isDataComplete()).to.be.true;
  });

});
