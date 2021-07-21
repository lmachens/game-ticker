import { useState } from 'react';
import { uploadHighlight } from '../../utils/highlights';

type UploadProps = {
  src: string;
};

function Upload({ src }: UploadProps): JSX.Element {
  const [url, setUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [total, setTotal] = useState(0);
  const [loaded, setLoaded] = useState(0);

  async function handleUpload() {
    try {
      const url = await uploadHighlight({
        src,
        onProgress: ({ loaded, total }) => {
          setTotal(total);
          setLoaded(loaded);
        },
      });
      setUrl(url);
    } catch (error) {
      console.error(error);
     if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  }

  return (
    <>
      <p>{src}</p>
      <button onClick={handleUpload}>Upload</button>
      <a href={url} target="_blank">
        {url}
      </a>
      <label>
        Upload Progress{' '}
        <progress max={total} value={loaded}>
          {(loaded / total) * 100}%
        </progress>{' '}
      </label>
      <p>{errorMessage}</p>
    </>
  );
}

export default Upload;
