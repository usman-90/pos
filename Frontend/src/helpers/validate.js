export const validateEmail = (email) => {
  const emailEx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  return emailEx.test(email);
};

export const validatePass = (pass) => {
  const passEx = /^[a-zA-Z]\w{7,16}$/;

  return passEx.test(pass);
};

export const checkPass = (pass1, pass2) => {
  return pass1 === pass2;
};

export const validateProducts = (products) => {
  let isValid = true;
  products.forEach((prod) => {
    if (prod?.product === "" || prod?.productQty === "") {
      isValid = false;
    }
    if (isValid) {
      delete prod.product.imgUrl;
      delete prod.product.addToWebsite;
      delete prod.product.userId;
    }
  });
  return isValid;
};
