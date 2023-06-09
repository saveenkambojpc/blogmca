import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { writeData } from "../api";
import { uploadFile, uploadFiles } from "../api/upload";
import CustomAlert from "../components/helper/CustomAlert";
import CustomTextField from "../components/helper/CustomTextField";
import BlogMaster from "../components/Master/BlogMaster";
import { styles } from "../css/style";
import { guidGenerator, toggleAlert } from "../misc/helper";
import { set_is_loading } from "../redux/features/helper";

const initialFormData = {
  heading: "",
  description: "",
  body: "",
};

export default function AddBlog() {
  const dispatch = useDispatch();
  const [form_data, set_form_data] = React.useState(initialFormData);

  // const [state, setState] = React.useState({});

  function handleChange(evt) {
    const value = evt.target.value;
    set_form_data({
      ...form_data,
      [evt.target.name]: value,
    });
  }
  async function handleBlogSubmit(e) {
    e.preventDefault();
    dispatch(set_is_loading(true));
    const id = guidGenerator();

    let file = form_data.files[0];
    const url = await uploadFile(id, file);

    const data = {
      ...form_data,
      image_link: url,
      id,
      comments: [],
      creator_id: JSON.parse(sessionStorage.getItem("auth")).uid,
      creator_name: JSON.parse(sessionStorage.getItem("auth")).displayName,
      created_at: new Date().toString(),
    };

    writeData("blogs", id, data, () => {
      dispatch(set_is_loading(false));
    });

    // reset the state
    set_form_data(initialFormData);
    document.getElementById("uploadIFileInput").value = "";
  }

  function handleFile(e) {
    // Getting the files from the input
    let files = e.target.files;
    set_form_data((prev) => ({ ...prev, files }));
  }

  // function handleUpload(e) {
  //   let file = state.files[0];

  //   // uploadFile(file);
  //   uploadFiles(state.files);
  // }

  return (
    <div className="flex gap-3 flex-col md:flex-row my-6 justify-center">
      <form className=" px-6 space-y-3 md:w-1/3" onSubmit={handleBlogSubmit}>
        <Typography variant="h4">Add New Blog</Typography>
        <CustomTextField
          onChange={handleChange}
          name="heading"
          required
          fullWidth
          label={"Heading"}
          value={form_data.heading}
        />
        <CustomTextField
          onChange={handleChange}
          name="description"
          value={form_data.description}
          required
          fullWidth
          label={"Description"}
        />
        <CustomTextField
          onChange={handleChange}
          value={form_data.body}
          name="body"
          required
          fullWidth
          label={"Body"}
          multiline
        />
        <div>
          <input
            type="file"
            multiple="multiple" //To select multiple files
            onChange={(e) => handleFile(e)}
            accept="image/png, image/gif, image/jpeg"
            required
            id="uploadIFileInput"
          />
        </div>

        <Button variant="contained" type="submit" sx={styles.filled_button}>
          Submit
        </Button>
      </form>
      {/* <hr className="md:hidden block"/> */}
      {/* <div className="px-6 md:w-2/3">
        <Typography variant="h4" className="pb-3">
        Manage Blogs
        </Typography>

        <BlogMaster />
      </div> */}
    </div>
  );
}
