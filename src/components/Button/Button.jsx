import css from './Button.module.css';
export function Button({ onClick }) {
  return (
    <div className={css.buttonWrapper}>
      <button
        className={css.button}
        type="button"
        name="load"
        onClick={onClick}
      >
        Load more
      </button>
    </div>
  );
}
