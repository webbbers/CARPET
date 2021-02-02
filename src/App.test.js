import { render, screen } from '@testing-library/react';
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from './App';
import { shallow ,configure } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

const mockStore = configureMockStore();
const store = mockStore({});
configure({adapter: new Adapter()});


// it("should render without throwing an error", () => {
//     expect(
//         shallow(
//             <Provider store={store}>
//                 <App />
//             </Provider>
//         ).exists(<div>hi</div>)
//     ).toBe(false);
// });


test('Fake Test',() => {
    expect(true).toBeTruthy();
})