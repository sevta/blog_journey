import Modal from "components/Admin/Modal";
import { useState } from "react";
import Image from "next/image";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "lib/firebase";
import AdminLayout from "components/Admin/AdminLayout";
import Fade from "components/Fade";
import { useStore } from "store";
import Table from "components/Admin/Table";
import { useRouter } from "next/router";

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [docImages, setDocImages] = useState([]);
  const [loadingDocImages, setLoadingDocImages] = useState(false);
  const [fakeData, setFakeData] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [fileFromEdit, setFileFromEdit] = useState("");

  const [docImageDetail, setDocImageDetail] = useState();

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const [showing, setShowing] = useState(false);

  const { modal, setModal, user, auth } = useStore();

  const router = useRouter();

  function generateFakeData() {
    const sample = {
      name: "Andreas",
      job: "developer",
      company: "ad",
      location: "Indonesia",
      last_login: "02 Nov 2021",
    };

    for (let i = 0; i < 20; i++) {
      setFakeData((old) => [...old, sample]);
    }
  }

  async function getImages() {
    setLoadingDocImages(true);
    setDocImages([]);
    const snapsot = await getDocs(collection(db, "images"));
    snapsot.forEach((doc) => setDocImages((old) => [...old, doc.data()]));
    setLoadingDocImages(false);
  }

  function onSelectFile(e) {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  }

  function handleSaveData() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("success saving data");
      closeModal();
    }, 3000);
  }

  function handleDelete(doc) {
    console.log("doc");
    setModal("admin-modal-confirm-delete");
  }

  function handleEdit(doc) {
    setDocImageDetail(doc);
    setTitle(doc.title);
    setAuthor(doc.email);
    setDescription(doc.description);
    setFileFromEdit(doc.file);
    setModal("admin-modal");
  }

  function closeModal() {
    setDocImageDetail({});
    setTitle("");
    setAuthor(user?.email);
    setDescription("");
    setFileFromEdit("");
    setSelectedFile("");
    setPreview("");
    setModal("");
  }

  useEffect(() => {
    getImages();
  }, []);

  useEffect(() => {
    setAuthor(user.email);
  }, [user]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    console.log(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!auth) router.replace("/");
  }, [auth]);

  return (
    <AdminLayout>
      {modal === "admin-modal-confirm-delete" && (
        <Modal variant="center" onClose={() => setModal("")}>
          <div className="text-3xl font-bold text-center">Aure you sure ?</div>
          <div className="flex mt-8">
            <button className="btn btn-primary flex-1">yes</button>
            <button className="btn btn-danger flex-1">nope</button>
          </div>
        </Modal>
      )}
      show={modal === "admin-modal"}
      <Fade show={modal === "admin-modal"}>
        <Modal title="The content" onClose={closeModal}>
          <div className="mt-10 space-y-4">
            {fileFromEdit ? (
              <div className="relative w-full h-80 rounded-box overflow-hidden">
                <Image
                  src={fileFromEdit}
                  layout="fill"
                  placeholder="blur"
                  blurDataURL="https://boofcv.org/images/5/5d/Kodim17_face_mean.jpg"
                  className="object-cover object-center"
                  alt="image"
                />
              </div>
            ) : (
              <div>
                {preview ? (
                  <>
                    <div className="relative w-full h-80 rounded-box overflow-hidden">
                      <Image
                        src={preview}
                        layout="fill"
                        placeholder="blur"
                        blurDataURL="https://boofcv.org/images/5/5d/Kodim17_face_mean.jpg"
                        className="object-cover object-center"
                        alt="image"
                      />
                    </div>
                    <div className="flex items-end py-6">
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => setPreview("")}
                      >
                        clear
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Upload</span>
                    </label>
                    <input
                      type="file"
                      className="input input-bordered"
                      onChange={onSelectFile}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text">title</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">author</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full input-disabled"
                value={author}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">description</span>
              </label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                value={description}
                className="textarea textarea-bordered"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">status</span>
              </label>
              <select
                className="select select-bordered w-full"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="publish">publish</option>
                <option value="private">private</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                className={`btn btn-primary ${isLoading && "loading"}`}
                onClick={handleSaveData}
              >
                save
              </button>
            </div>
          </div>
        </Modal>
      </Fade>
      <Stats />
      <Table
        data={docImages}
        loading={loadingDocImages}
        onEditClick={handleEdit}
        onDeleteClick={handleDelete}
      />
      <Fade show={showing}>
        <div className="shadow p-10 bg-base-100 text-white rounded-xl">
          tester
        </div>
      </Fade>
      <button
        className="btn btn-secondary text-sm capitalize"
        onClick={() => setShowing(!showing)}
      >
        test button
      </button>
    </AdminLayout>
  );
}

function Stats() {
  return (
    <div className="w-full shadow stats hidden">
      <div className="stat">
        <div className="stat-figure text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Total Likes</div>
        <div className="stat-value text-primary">25.6K</div>
        <div className="stat-desc">21% more than last month</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Page Views</div>
        <div className="stat-value text-info">2.6M</div>
        <div className="stat-desc">21% more than last month</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-info">
          <div className="avatar online">
            <div className="w-16 h-16 p-1 mask mask-squircle bg-base-100">
              <Image
                src="https://images.unsplash.com/photo-1633114072460-c7dd0b7c6161?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                alt="Avatar Tailwind CSS Component"
                className="mask mask-squircle"
                layout="fill"
              />
            </div>
          </div>
        </div>
        <div className="stat-value">86%</div>
        <div className="stat-title">Tasks done</div>
        <div className="stat-desc text-info">31 tasks remaining</div>
      </div>
    </div>
  );
}
