/* eslint-disable import/no-anonymous-default-export */
export default {
    get: jest.fn(),
    create: jest.fn(function () {
        return this;
    }),
    delete: jest.fn(),
    post: jest.fn().mockResolvedValue({ data: {} }),
    put: jest.fn().mockResolvedValue({ data: {} }),
};
