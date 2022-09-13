import React from "react";
// import { Button } from "../../utilities/Button.js";
var styles = {
  page1: {
    backgroundColor: "gold",
    height: "50vh",
    margin: 15
  },
  page2: {
    backgroundColor: "deepskyblue",
    height: "50vh",
    margin: 15
  },
  page3: {
    backgroundColor: "tomato",
    height: "50vh",
    margin: 15
  }
};

class BakerFilter extends React.Component {
  highlightLSD(stream) {
    alert(`Highlighting ${stream}`);
  }

  render() {
    return <h3>Baker Filter</h3>;
  }
}

export default class Onboarding extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 1
    };
    this.child = React.createRef();
  }

  selectedFromMap(stream) {
    this.child.current.highlightLSD(stream);
  }

  forward() {
    const { page } = this.state;
    this.setState({
      // page: page === 1 ? 2 : page === 2 ? 3 : 1
      page: page === 1 ? 2 : 3
    });
  }

  backward() {
    const { page } = this.state;
    this.setState({
      // page: page === 1 ? 3 : page === 3 ? 2 : 1
      page: page === 3 ? 2 : 1
    });
  }

  render() {
    const { page } = this.state;

    return (
      <div>
        <div className="row">
          <h3>Onboarding Example</h3>
        </div>
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <div className="row">
              <button onClick={() => this.backward()}>Back</button>
              {/* <Button
                iconLeft={<i className="fas fa-arrow-left" />}
                value={"Back"}
                className={`btn btn-default ${page === 1 ? `disabled` : ``}`}
                onClick={() => this.backward()}
              /> */}
              <button onClick={() => this.forward()}>Next</button>
              {/* <Button
                value={"Next"}
                icon={<i className="fas fa-arrow-right" />}
                className={`btn btn-default ${page === 3 ? `disabled` : ``}`}
                onClick={() => this.forward()}
              /> */}

              <div
                style={
                  page === 1
                    ? styles.page1
                    : page === 2
                    ? styles.page2
                    : styles.page3
                }
              >
                <h3>Page {page}</h3>
                {page === 1 ? (
                  <h4>Add Sites</h4>
                ) : page === 2 ? (
                  <h4>Preview Sites Added</h4>
                ) : (
                  <div>
                    <h4>Finish</h4>
                    {/* <Button value={"Finish"} className={"btn btn-default"} /> */}
                    <button className='btn btn-default'>Finish</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <br />

        <div className="row">
          <BakerFilter ref={this.child} />
          {/* <Button value={"Test"} className={"btn btn-default"} /> */}
          <button className='btn btn-default'>Test</button>
        </div>
      </div>
    );
  }
}
