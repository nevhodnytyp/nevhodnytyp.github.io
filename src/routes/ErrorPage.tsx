import erroImage from '../assets/errorImage.png'

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-5">
      <img
        src={erroImage}
        alt="Error Illustration"
        className="max-w-xl w-[300px] h-auto"
      />
      <h1 className="text-red-500 text-4xl mb-4">
        Oops! Something went wrong.
      </h1>
      <p className="text-xl text-center mb-4">
        We apologize for the inconvenience, but it seems that an error has
        occurred. Our team has been notified and is working diligently to
        resolve the issue as quickly as possible. Please try again later.
      </p>
      <p className="text-xl">
        We appreciate your patience and understanding. Thank you for visiting
        our website.
      </p>
    </div>
  )
}
export default ErrorPage
