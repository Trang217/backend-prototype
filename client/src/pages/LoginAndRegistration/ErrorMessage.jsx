export default function ErrorMessage({ isVisible, errorMessage }) {
  return (
    <>
      {isVisible && Array.isArray(errorMessage) ? (
        <div>
          {errorMessage.map((err) => (
            <p className=" error-message ">{err}</p>
          ))}
        </div>
      ) : isVisible ? (
        <p className="error-message">{errorMessage}</p>
      ) : null}
    </>
  );
}
