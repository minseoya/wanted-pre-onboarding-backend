const kakaoUser = {
  password: "testpassword!",
  email: "test1@kakao.com",
};

const naverUser = {
  password: "testpassword!",
  email: "test2@kakao.com",
};

const GsUser = {
  password: "testpassword!",
  email: "test3@kakao.com",
};

const CuUser = {
  password: "testpassword!",
  email: "test4@kakao.com",
};

const GsPost = {
  userId: 1,
  title: "gs",
  content: "25",
};

const CuPost = {
  userId: 2,
  title: "cu",
  content: "25",
};
const defaltProductListEnum = Object.freeze({
  DEFAULT_LIMIT: 15,
  DEFAULT_OFFSET: 0,
});

module.exports = { kakaoUser, naverUser, GsUser, CuUser, GsPost, CuPost };
