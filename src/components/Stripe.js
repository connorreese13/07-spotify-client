import React from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";

class Stripe extends React.Component {
  state = {
    message: {
      content: "",
      type: ""
    }
  };
  pay = () => {
    this.props.stripe.createToken({}).then(token => {
      axios
        .post(`${process.env.REACT_APP_API}/pay`, token)
        .then(res => {
          if (res.data.status === "succeeded") {
            this.setState({
              message: {
                content: "Payment Successful. Thank you.",
                type: "success"
              }
            });
          } else {
            console.log(res.data);
            this.setState({
              message: {
                content: res.data.code,
                type: "error"
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  getMessageClass = () => {
    if (!this.state.message.type) {
      return "";
    } else if (this.state.message.type === "success") {
      return "success";
    } else {
      return "error";
    }
  };
  render() {
    return (
      <>
        <CardElement />
        {this.state.message ? (
          <div className={this.getMessageClass()}>
            {this.state.message.content}
          </div>
        ) : (
          ""
        )}
        <button className="submit" onClick={this.pay}>
          Pay
        </button>
      </>
    );
  }
}

export default injectStripe(Stripe);
