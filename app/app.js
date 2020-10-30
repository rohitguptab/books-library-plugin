import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import { Loader, roundLoader, notFound } from './icons';

import StarsRating from 'stars-rating';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      authorData: [],
      publisherData: [],
      isLoading: true,
      isFilterLoading: true,
      loadMoreLoader: false,
      pageNo: 1,
      minPrice: '',
      maxPrice: '',
      authorId: '',
      publisherId: '',
      search: '',
      totleBlogs: 1,
      ratingValue: 0,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
    this.fetchFilter();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      data,
      pageNo,
      authorId,
      publisherId,
      search,
      ratingValue,
      minPrice,
      maxPrice,
    } = this.state;
    setTimeout(() => {
      if (
        search !== prevState.search ||
        authorId !== prevState.authorId ||
        ratingValue !== prevState.ratingValue ||
        minPrice !== prevState.minPrice ||
        maxPrice !== prevState.maxPrice ||
        publisherId !== prevState.publisherId
      ) {
        this.setState({
          pageNo: 1,
          isLoading: true,
          data: [],
        });
        this.fetchData();
      }
      if (pageNo !== prevState.pageNo) {
        this.fetchData();
      }
    }, 500);
  }

  fetchData(condition) {
    const {
      data,
      pageNo,
      authorId,
      publisherId,
      search,
      ratingValue,
      minPrice,
      maxPrice,
    } = this.state;
    fetch(
      `/wp-json/books_library/v1/books?paged=${pageNo}&search=${search}&a=${authorId}&p=${publisherId}&min=${minPrice}&max=${maxPrice}&rating=${
        0 === ratingValue ? '' : ratingValue
      }`,
      {
        method: 'get',
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.status) {
          this.setState({
            data: [...data, ...response.data],
            isLoading: false,
            loadMoreLoader: false,
            totleBlogs: response.total_post,
          });
        } else {
          this.setState({
            data: [],
            isLoading: false,
            loadMoreLoader: false,
            totleBlogs: response.total_post,
          });
        }
      });
  }

  fetchFilter(condition) {
    fetch('/wp-json/books_library/v1/book_filter', {
      method: 'get',
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status) {
          this.setState({
            authorData: response.author,
            publisherData: response.publisher,
            isFilterLoading: false,
          });
        } else {
          this.setState({
            isFilterLoading: false,
          });
        }
      });
  }

  render() {
    const {
      data,
      authorData,
      publisherData,
      isLoading,
      pageNo,
      authorId,
      publisherId,
      minPrice,
      maxPrice,
      loadMoreLoader,
      totleBlogs,
      search,
      ratingValue,
    } = this.state;

    return (
      <Fragment>
        {'true' === document.getElementById('react-blog-app').dataset.filter ? (
          <ul className={`books-filter ${isLoading ? 'disable' : ''}`}>
            <li>
              <label>Name</label>
              <input
                placeHolder="Book Name"
                type="text"
                id="name"
                name="name"
                value={search}
                onChange={(value) => {
                  this.setState({
                    search: value.target.value,
                  });
                }}
              />
            </li>
            <li>
              <label>Author</label>
              <select
                name="author"
                id="author"
                onChange={(value) => {
                  this.setState({
                    authorId: value.target.value,
                  });
                }}
              >
                <option value="">Select Author</option>
                {authorData.map((author, i) => {
                  return (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  );
                })}
              </select>
            </li>
            <li>
              <label>Publisher</label>
              <select
                name="publisher"
                id="publisher"
                onChange={(value) => {
                  this.setState({
                    publisherId: value.target.value,
                  });
                }}
              >
                <option value="">Select Publisher</option>
                {publisherData.map((publisher, i) => {
                  return (
                    <option key={publisher.id} value={publisher.id}>
                      {publisher.name}
                    </option>
                  );
                })}
              </select>
            </li>
            <li className="price">
              <label>Price</label>
              <div className="price-inner">
                <input
                  onChange={(value) => {
                    this.setState({
                      minPrice: value.target.value,
                    });
                  }}
                  type="number"
                  id="min"
                  name="min"
                />{' '}
                TO
                <input
                  onChange={(value) => {
                    this.setState({
                      maxPrice: value.target.value,
                    });
                  }}
                  type="number"
                  id="max"
                  name="min"
                />
              </div>
            </li>
            <li className="rating-lable">
              <label>Rating</label>
              <StarsRating
                className="rating"
                count={5}
                value={ratingValue}
                half={false}
                onChange={(value) => {
                  this.setState({
                    ratingValue: value,
                  });
                }}
                color2={'#0c547f'}
              />
              {0 !== ratingValue && (
                <button
                  onClick={(value) => {
                    this.setState({
                      ratingValue: 0,
                    });
                    this.forceUpdate();
                  }}
                >
                  Clear
                </button>
              )}
            </li>
          </ul>
        ) : null}
        <ul className={`books ${isLoading ? 'loading-data' : ''}`}>
          {isLoading ? (
            <div className="loading">{roundLoader}</div>
          ) : (
            <Fragment>
              {0 < data.length ? (
                data.map((item, index) => {
                  if (item.title) {
                    return (
                      <li key={item.id} id={item.id} className="book-item">
                        <div className="inner">
                          <div className="book-image">
                            {item.image ? (
                              <img className="feature" src={item.image} />
                            ) : (
                              <div className="no-image">No Feature Image</div>
                            )}
                          </div>
                          <div className="book-details">
                            <h3 className="title">{item.title}</h3>
                            {item.rating && (
                              <StarsRating
                                className="rating"
                                count={5}
                                value={item.rating}
                                edit={false}
                                color2={'#0c547f'}
                              />
                            )}
                            {0 < item.author.length && (
                              <div className="author">
                                <strong>Author: </strong>
                                {item.author.map((author, i) => {
                                  return <span>{author.name}</span>;
                                })}
                              </div>
                            )}
                            {0 < item.publisher.length && (
                              <div className="author">
                                <strong>publisher: </strong>
                                {item.publisher.map((publisher, i) => {
                                  return <span>{publisher.name}</span>;
                                })}
                              </div>
                            )}
                            {item.description ? (
                              <div
                                className="details"
                                dangerouslySetInnerHTML={{
                                  __html: item.description,
                                }}
                              />
                            ) : null}
                            <div className="buy">
                              {item.price && (
                                <strong className="price">
                                  ₹ {item.price}
                                </strong>
                              )}
                              {item.link && (
                                <a className="button" href={item.link}>
                                  Buy Now
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  }
                })
              ) : (
                <div className="no-data">
                  {notFound}
                  <strong>"Oh- uh"</strong>
                  <p>Sorry Could not find any Book</p>
                </div>
              )}
              {totleBlogs > data.length ? (
                <div className="load-more">
                  {loadMoreLoader ? (
                    Loader
                  ) : (
                    <button
                      onClick={() => {
                        this.setState({
                          pageNo: pageNo + 1,
                          loadMoreLoader: true,
                        });
                      }}
                    >
                      Load More
                    </button>
                  )}
                </div>
              ) : null}
            </Fragment>
          )}
        </ul>
      </Fragment>
    );
  }
}

if (document.getElementById('react-blog-app')) {
  ReactDOM.render(<App />, document.getElementById('react-blog-app'));
}
