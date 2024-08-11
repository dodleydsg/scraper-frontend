import "./base.css";
import { useCallback, useState } from "react";

const BACKEND_URL = "http://localhost:5000/api/analyzeHTML";

type DATA = {
  headings?: {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
  };
  title: string;
  htmlVersion: string;
  loginform: boolean;
  externalLinks: [string];
  internalLinks: [string];
  linkValidationResults: [
    { link: string; status: number | string; reachable: boolean }
  ];
};

function getUrlDetails(url: string) {
  return fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) =>
      Promise.reject(error?.response?.data?.message ?? "Error")
    );
}

export default function App() {
  const [url, setUrl] = useState("");
  // useEffect(() => {
  //   useCallback(() => getUrlDetails(url), [url]);
  // }, [url]);
  const [data, setData] = useState({} as DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = useCallback(
    (event: React.ChangeEvent<HTMLFormElement>) => {
      setError(false);
      setLoading(true);
      event.preventDefault();
      const formData = new FormData(event.target);
      getUrlDetails(formData.get("url") as string)
        .then((data) => {
          if (data.error) {
            setError(true);
          } else {
            setData(data);
            console.log(data);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
    },
    [url]
  );

  return (
    <div className="container mx-auto px-4">
      <div className="flex gap-2 items-baseline mb-6">
        <h2>Site Analyser</h2>
        <p className="text-micro">Analyse sections of an HTML page</p>
      </div>
      <hr />
      {/* Table and form section */}
      <div>
        <form className="form-section" onSubmit={handleSubmit}>
          <div className="relative flex gap-2 items-center">
            <label htmlFor="searchTerm" className="text-base">
              URL to analyzer
            </label>
            <input
              type="text"
              name="url"
              id="url"
              className="input"
              placeholder="Enter url to validate"
            />

            <button
              type="submit"
              onSubmit={(e) => {
                e.preventDefault();
                setUrl;
              }}
              className="rounded btn btn-primary"
            >
              Get results
            </button>
            {error ? (
              <span className="text-danger text-xs">{error}</span>
            ) : null}
            {loading ? <span className="text-xs">Loading...</span> : null}
          </div>
        </form>
        <table>
          <thead className={loading ? "loading" : ""}>
            <tr>
              <th>HTML Version</th>
              <th>Login page?</th>
              <th>Page title</th>
              <th>Headers</th>
              <th>Links</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.htmlVersion}</td>
              <td>
                {data.loginform ? "Authentication page" : "No authentication"}
              </td>
              <td>{data.title}</td>

              <td>
                <table>
                  <thead>
                    <tr>
                      <th>Header TYPE</th>
                      <th>Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries((data.headings as object) || {}).map(
                      ([heading, count], index) => {
                        return (
                          <tr key={index}>
                            <td>{heading.toUpperCase()}</td>
                            <td>{count}</td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </td>
              <td>
                <table>
                  <thead>
                    <tr>
                      <th>Internal</th>
                      <th>External</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {data?.internalLinks?.map((link, index) => {
                          const validationResult =
                            data.linkValidationResults?.find(
                              (obj) => obj.link === link
                            );

                          return (
                            <div className="link" key={index}>
                              <span> {link}</span>

                              <div>
                                <p className="header">Link report</p>
                                <hr />
                                <a href={link} target="_blank">
                                  Click to follow
                                </a>
                                <p className="text-xs">
                                  <b>LINK HEALTH</b>
                                  {validationResult?.reachable ? (
                                    <svg
                                      style={{
                                        color: "green",
                                        width: 12,
                                        paddingLeft: 10,
                                      }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="size-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m4.5 12.75 6 6 9-13.5"
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      style={{
                                        color: "red",
                                        width: 12,
                                        paddingLeft: 10,
                                      }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="size-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                      />
                                    </svg>
                                  )}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </td>
                      <td>
                        {data?.externalLinks?.map((link, index) => {
                          const validationResult =
                            data.linkValidationResults?.find(
                              (obj) => obj.link === link
                            );

                          return (
                            <div className="link" key={index}>
                              <span> {link}</span>

                              <div>
                                <p className="header">Link report</p>
                                <hr />
                                <a href={link} target="_blank">
                                  Click to follow
                                </a>
                                <p className="text-xs">
                                  <b>LINK HEALTH</b>
                                  {validationResult?.reachable ? (
                                    <svg
                                      style={{
                                        color: "green",
                                        width: 12,
                                        paddingLeft: 10,
                                      }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="size-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m4.5 12.75 6 6 9-13.5"
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      style={{
                                        color: "red",
                                        width: 12,
                                        paddingLeft: 10,
                                      }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="size-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                      />
                                    </svg>
                                  )}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
