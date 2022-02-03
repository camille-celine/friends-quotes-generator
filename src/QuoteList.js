import React, { Component } from "react";
import Quote from "./Quote";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import "./QuoteList.css";
import couch from "./couch.svg"

class QuoteList extends Component {
  static defaultProps = {
    numQuotesToGet: 5
  };
  constructor(props) {
    super(props);
    this.state = {
      quotes: JSON.parse(window.localStorage.getItem("quotes") || "[]"),
      loading: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    if (this.state.quotes.length === 0) this.getQuotes();
  }
  async getQuotes() {
    try {
      let quotes = [];
      while (quotes.length < this.props.numQuotesToGet) {
        let res = await axios.get("https://friends-quotes-api.herokuapp.com/quotes/random");
        let newQuote = res.data.quote;
        const quoteExist = quotes.some(quote => {
          return quote.text === newQuote;
        });
        const seenQuotes = new Set(this.state.quotes.map(q => q.text));
        if (!quoteExist && !seenQuotes.has(newQuote)) {
          quotes.push({ id: uuidv4(), text: newQuote, votes: 0 });
        } else {
          console.log("FOUND A DUPLICATE!");
          console.log(newQuote);
        }
      }
      this.setState(
        st => ({
          loading: false,
          quotes: [...st.quotes, ...quotes]
        }),
        () =>
          window.localStorage.setItem("quotes", JSON.stringify(this.state.quotes))
      );
    } catch (e) {
      alert(e);
      this.setState({ loading: false });
    }
  }
  handleVote(id, delta) {
    this.setState(
      st => ({
        quotes: st.quotes.map(q =>
          q.id === id ? { ...q, votes: q.votes + delta } : q
        )
      }),
      () =>
        window.localStorage.setItem("quotes", JSON.stringify(this.state.quotes))
    );
  }
  handleClick() {
    this.setState({ loading: true }, this.getQuotes);
  }
  render() {
    if (this.state.loading) {
      return (
        <div className='QuoteList-spinner'>
          <i className='far fa-8x fa-laugh fa-spin' />
          <h1 className='QuoteList-title'>Loading...</h1>
        </div>
      );
    }
    let quotes = this.state.quotes.sort((a, b) => b.votes - a.votes);
    return (
      <div className='QuoteList'>
        <div className='QuoteList-sidebar'>
          <h1 className='QuoteList-title'>
            F.R.I.E.N.D.S <span>Quotes</span>
          </h1>
          <img src={couch} alt="emoji"/>
          <button className='QuoteList-getmore' onClick={this.handleClick}>
            Fetch Quotes
          </button>
        </div>

        <div className='QuoteList-quotes'>
          {quotes.map(q => (
            <Quote
              key={q.id}
              votes={q.votes}
              text={q.text}
              upvote={() => this.handleVote(q.id, 1)}
              downvote={() => this.handleVote(q.id, -1)}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default QuoteList;
