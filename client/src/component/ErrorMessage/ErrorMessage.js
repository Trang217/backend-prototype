export default function ErrorMessage({ isVisible, errorMessage }) {
  return (
    <>
      {isVisible && Array.isArray(errorMessage) ? (
        <div>
          {errorMessage.map((err) => (
            <p className="text-red-500 text-xs pt-0.5 text-left">{err}</p>
          ))}
        </div>
      ) : isVisible ? (
        <p className="text-red-500 text-xs pt-0.5 text-left">{errorMessage}</p>
      ) : null}
    </>
  );
}
