import React from "react";
import { reducer as repoReducer, fetchRepos } from "../store/repoSlice";
import { configureStore } from "@reduxjs/toolkit";

const fetchMock = require("fetch-mock-jest");

describe("RepoSlice", () => {
  describe("repoSlice", () => {
    test("initial state", () => {
      expect(repoReducer(undefined, { type: undefined })).toEqual({
        isLoading: false,
        repos: [],
        error: undefined,
      });
    });

    test("set loading on start request", () => {
      const action = {
        type: fetchRepos.pending.type,
      };

      expect(repoReducer(undefined, action)).toEqual({
        isLoading: true,
        repos: [],
        error: undefined,
      });
    });

    test("should set error", () => {
      const action = {
        type: fetchRepos.rejected.type,
        error: new Error("rejected error"),
      };

      expect(
        repoReducer({ isLoading: true, repos: [], error: undefined }, action)
      ).toEqual({
        isLoading: false,
        repos: [],
        error: new Error("rejected error"),
      });
    });

    test("should set repo", () => {
      const action = {
        type: fetchRepos.fulfilled.type,
        payload: [{ id: 1, name: "mem", fork: false }],
      };

      expect(
        repoReducer({ isLoading: true, repos: [], error: undefined }, action)
      ).toEqual({
        isLoading: false,
        repos: [{ id: 1, name: "mem", fork: false }],
        error: undefined,
      });
    });
  });

  describe("fetchRepos thunk", () => {
    afterEach(() => fetchMock.restore());

    test("success fetch", async () => {
      fetchMock.mock("https://api.github.com/repositories", {
        status: 200,
        body: [
          { id: 1, name: "Swift", fork: false },
          { id: 2, name: "NodeJS", fork: false },
        ],
      });

      const store = configureStore({ reducer: repoReducer });

      store.dispatch(fetchRepos()).then(() => {
        expect(store.getState()).toEqual({
          isLoading: false,
          repos: [
            { id: 1, name: "Swift", fork: false },
            { id: 2, name: "NodeJS", fork: false },
          ],
          error: undefined,
        });
      });
    });
  });
});
