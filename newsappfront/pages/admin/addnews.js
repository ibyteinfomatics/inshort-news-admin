import Head from "next/head";
import SideBar from "../../components/side-bar/SideBar";
import DashboardHeader from "../../components/header/DashboardHeader";
import { useState } from "react";
import { userService } from "../../services";
import { toast } from "react-toastify";

export default function AddNews() {
  const [body, setBody] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const required = [
    "category",
    "type",
    "source",
    "author",
    "description",
    "title",
    "reference_link",
    'image'
  ];

  const mustFill = () => {
    let newError = { ...formErrors };
    for (const item of required) {
      if (!body[item]) {
        newError[item] = { message: `${item} is required` };
      }
    }
    return newError;
  };

  const addNews = async (e) => {
    e.preventDefault();
    try {
      setFormErrors(mustFill());
      for (const item of required) {
        if (!body.hasOwnProperty(item)) {
          return;
        }
      }
      const response = await userService.addSingleNews(body);
      if (response?.data?.success) {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(response.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return error.message;
    }
  };
  return (
    <>
      <Head>
        <title>Add News</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <SideBar />

      <div className="container dashboard sideBarOpen">
        <DashboardHeader message="Add News" />

        <div className="w-50">
          <div className="dashboard_content newLayout ">
            {
              <form className="addNew" onSubmit={(e) => addNews(e)}>
                <p className="addSel"> Select the Category for your News</p>
                <select
                  className="form-select form-select-lg mb-3"
                  aria-label="Large select example"
                  style={{
                    border: "1px solid black",
                    fontSize: "15px",
                  }}
                  onChange={(e) => {
                    setBody({ ...body, category: e.target.value });
                    setFormErrors({ ...formErrors, category: "" });
                  }}
                >
                  <option value="">Select category</option>
                  <option value="sports">Sports</option>
                  <option value="general">General</option>
                  <option value="business">Business</option>
                  <option value="technology">Technology</option>
                  <option value="science">Science</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="health">Health</option>
                </select>
                {formErrors?.category?.message && (
                  <small style={{ color: "red" }}>
                    {formErrors?.category?.message}
                  </small>
                )}
                <p className="addSel"> Select News Type </p>
                <select
                  className="form-select form-select-lg mb-3"
                  aria-label="Large select example"
                  style={{
                    border: "1px solid black",
                    fontSize: "15px",
                  }}
                  onChange={(e) => {
                    setBody({ ...body, type: e.target.value });
                    setFormErrors({ ...formErrors, type: "" });
                  }}
                >
                  <option value="">Select Type</option>
                  <option value="major">Major</option>
                  <option value="all">All</option>
                </select>
                {formErrors?.type?.message && (
                  <small style={{ color: "red" }}>
                    {formErrors?.type?.message}
                  </small>
                )}
                <p className="addSel"> Enter Source of News</p>
                <div className="form-check">
                  <div>
                    <div class="col-auto">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Source"
                        style={{ border: "1px solid black", fontSize: "15px" }}
                        onChange={(e) => {
                          setBody({ ...body, source: e.target.value });
                          setFormErrors({ ...formErrors, source: "" });
                        }}
                      />
                    </div>
                  </div>
                </div>
                {formErrors?.source?.message && (
                  <small style={{ color: "red" }}>
                    {formErrors?.source?.message}
                  </small>
                )}
                <p className="addSel"> Enter Author of News</p>
                <div className="form-check">
                  <div>
                    <div class="col-auto">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Author"
                        style={{ border: "1px solid black" }}
                        onChange={(e) => {
                          setBody({ ...body, author: e.target.value });
                          setFormErrors({ ...formErrors, author: "" });
                        }}
                      />
                    </div>
                  </div>
                </div>
                {formErrors?.author?.message && (
                  <small style={{ color: "red" }}>
                    {formErrors?.author?.message}
                  </small>
                )}
                <p className="addSel"> Enter Title</p>
                <div className="form-check">
                  <div>
                    <div className="col-auto">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        style={{ border: "1px solid black", fontSize: "15px" }}
                        onChange={(e) => {
                          setBody({ ...body, title: e.target.value });
                          setFormErrors({ ...formErrors, title: "" });
                        }}
                      />
                    </div>
                  </div>
                </div>
                {formErrors?.title?.message && (
                  <small style={{ color: "red" }}>
                    {formErrors?.title?.message}
                  </small>
                )}
                <p className="addSel"> Enter Description</p>
                <div className="form-check">
                  <div action="">
                    <div class="col-auto">
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        style={{ border: "1px solid black", fontSize: "15px" }}
                        onChange={(e) => {
                          setBody({ ...body, description: e.target.value });
                          setFormErrors({ ...formErrors, description: "" });
                        }}
                      />
                    </div>
                  </div>
                </div>
                {formErrors?.description?.message && (
                  <small style={{ color: "red" }}>
                    {formErrors?.description?.message}
                  </small>
                )}
                <p className="addSel"> Enter Reference Link</p>
                <div className="form-check">
                  <div>
                    <div class="col-auto">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Link"
                        style={{ border: "1px solid black", fontSize: "15px" }}
                        onChange={(e) => {
                          setBody({ ...body, reference_link: e.target.value });
                          setFormErrors({ ...formErrors, reference_link: "" });
                        }}
                      />
                    </div>
                  </div>
                </div>
                {formErrors?.reference_link?.message && (
                  <small style={{ color: "red" }}>
                    {formErrors?.reference_link?.message}
                  </small>
                )}
                <p className="addSel"> Enter Content of News</p>
                <div className="form-check">
                  <div>
                    <div class="col-auto">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Content"
                        style={{ border: "1px solid black", fontSize: "15px" }}
                        onChange={(e) =>
                          setBody({ ...body, content: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <p className="addSel"> Choose Image for News</p>
                <div>
                  <label
                    htmlFor="formFile"
                    className="input"
                    style={{ border: "1px solid black" }}
                  >
                    {body?.image ? body?.image?.name : "No file Choosen "}
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    onChange={(e) =>{
                      setBody({ ...body, image: e.currentTarget.files?.[0] })
                      setFormErrors({ ...formErrors, image: "" });
                    }}
                  />
                </div>
                {formErrors?.image?.message && (
                  <small style={{ color: "red" }}>
                    {formErrors?.image?.message}
                  </small>
                )}
                <div className="f">
                  <button type="submit" className="newButton">
                    Publish News
                  </button>
                </div>
              </form>
            }
          </div>
        </div>
      </div>
    </>
  );
}
