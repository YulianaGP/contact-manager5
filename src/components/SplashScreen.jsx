const SplashScreen = ({ isLoading, error }) => {
  if (!isLoading) return null;

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      {error ? (
        <>
          <p style={{ color: '#ff6b6b' }}>❌ {error}</p>
          <p style={{ color: '#999' }}>
            Verify your connection and try again.
          </p>
        </>
      ) : (
        <h2>📇 Starting Contact Manager...</h2>
      )}
    </div>
  );
};

export default SplashScreen;
