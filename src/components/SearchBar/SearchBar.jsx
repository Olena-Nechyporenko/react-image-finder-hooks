import { AiOutlineSearch } from 'react-icons/ai';
import { Component } from 'react';
import { Field, Formik, Form } from 'formik';
import css from './SearchBar.module.css';

const initialValue = { keyword: '' };
export class SearchBar extends Component {
  handleSubmit = (values, { resetForm }) => {
    this.props.onSubmit(values.keyword.trim());
    resetForm();
  };
  render() {
    return (
      <header className={css.searchbar}>
        <Formik initialValues={initialValue} onSubmit={this.handleSubmit}>
          <Form className={css.form} autoComplete="off">
            <button type="submit" className={css.button}>
              <AiOutlineSearch className={css.svg} size={25} />
              <span className={css.buttonLabel}>Search</span>
            </button>
            <label className={css.label} htmlFor="keyword">
              <Field
                className={css.input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                name="keyword"
              />
            </label>
          </Form>
        </Formik>
      </header>
    );
  }
}
