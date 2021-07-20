import { useState } from 'react';
import { uploadHighlight } from '../../utils/highlights';

type UploadProps = {
  src: string;
};

function Upload({ src }: UploadProps): JSX.Element {
  const [url, setUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleUpload() {
    try {
      const url = await uploadHighlight(src);
      setUrl(url);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  }

  return (
    <>
      <p>{src}</p>
      <button onClick={handleUpload}>Upload</button>
      <a href={url} target="_blank">
        {url}
      </a>
      <p>{errorMessage}</p>
    </>
  );
}

export default Upload;
