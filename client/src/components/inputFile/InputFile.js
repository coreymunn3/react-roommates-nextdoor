import React, { Fragment, useState, useEffect } from 'react';
import InputField from '../inputField/InputField';

const InputFile = () => {
  const [previewFile, setPreviewFile] = useState();
  return (
    <Fragment>
      <InputField />
    </Fragment>
  );
};

export default InputFile;
