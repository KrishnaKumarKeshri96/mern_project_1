//Creating Token and Saving in Cookies

export const saveToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  //Options for Cookies
  const options = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIES_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token, user });
};
