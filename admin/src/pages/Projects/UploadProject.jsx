import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";
import { ImageIcon } from "lucide-react";

const steps = ["Basic Info", "Details", "Gallery", "Review"];

const categories = [
  { name: "International Projects" },
  { name: "Special Design" },
  { name: "Green Building" },
  { name: "Heritage Building" },
  { name: "Government" },
  { name: "Mivan Formwork" },
  { name: "Electrical Audit" },
  { name: "MOEF / CRZ" },
  { name: "High Rise" },
  { name: "Commercial Building" },
  { name: "Township Planning" },
  { name: "Residential Building" },
  { name: "Bungalows + Rowhouse + Duplex" },
  { name: "Hotel & Restaurant" },
  { name: "Hospital" },
  { name: "Mall" },
  { name: "Industrial" },
  { name: "Institutional" },
  { name: "Religious Monuments" },
  { name: "Interior" }
];

/* ✅ ADDED SLUG FUNCTION */
const createSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

export default function UploadProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    service: "",
    architect: "",
    client: "",
    area: "",
    status: "Ongoing",
  });

  const [cover, setCover] = useState(null);
  const [images, setImages] = useState(Array(5).fill(null));
  const [existingCover, setExistingCover] = useState(null);
  const [existingImages, setExistingImages] = useState([]);

  /* ---------------- FETCH PROJECT (EDIT MODE) ---------------- */
  useEffect(() => {
    if (id) {
      api.get(`/projects/${id}`).then((res) => {
        const project = res.data.project;

        setData(project);

        // existing images for preview
        setExistingCover(project.coverimg || null);
        setExistingImages([...project.images].filter(Boolean));
      });
    }
  }, [id]);

  /* ---------------- VALIDATION ---------------- */
  const validateStep = () => {
    // STEP 0 : BASIC INFO
    if (step === 0) {
      if (!data.title || !data.category || !data.description) {
        Swal.fire("Error", "All fields in Basic Info are required", "error");
        return false;
      }

      // Cover image required ONLY in create mode
      if (!id && !cover) {
        Swal.fire("Error", "Cover image is required", "error");
        return false;
      }
    }

    // STEP 1 : DETAILS
    if (step === 1) {
      const required = ["service", "architech", "client", "area", "location", "status"];
      const missing = required.some((key) => !data[key]);

      if (missing) {
        Swal.fire("Error", "All fields in Details are required", "error");
        return false;
      }
    }

    // STEP 2 : GALLERY
    if (step === 2 && !id) {
      if (images.filter(Boolean).length < 1) {
        Swal.fire("Error", "At least 1 images are required", "error");
        return false;
      }
    }

    return true;
  };

  /* ---------------- STEP NAV ---------------- */
  const next = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, 3));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const goTo = (i) => setStep(i);

  /* ---------------- SUBMIT ---------------- */

  const submit = async () => {
    if (loading) return; // ✅ Prevent multiple clicks

    if (!id && images.filter(Boolean).length < 1) {
      return Swal.fire("Error", "Minimum 1 images required", "error");
    }

    setLoading(true); // ✅ Start loading

    const form = new FormData();

    // basic fields
    Object.entries(data).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        form.append(k, v);
      }
    });

    // cover (only send if changed)
    if (cover instanceof File) {
      form.append("coverimg", cover);
    }

    images.forEach((img, index) => {
      if (img instanceof File) {
        form.append("images", img);
        form.append("imageIndexes", index); // 🔥 KEY FIX
      }
    });

    try {
      if (id) {
        await api.put(`/projects/${id}`, form);
        Swal.fire("Updated", "Project updated successfully", "success");
      } else {
        await api.post("/projects", form);
        Swal.fire("Uploaded", "Project uploaded successfully", "success");
      }
      navigate("/");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Upload failed", "error");
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  /* ✅ GET CATEGORY DISPLAY NAME FOR REVIEW */
  const selectedCategory =
    categories.find((cat) => createSlug(cat.name) === data.category)?.name ||
    data.category;

  return (
    <div className="bg-white min-h-screen flex justify-center py-6 px-4">

      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-[30px] font-bold mb-4">Upload Project</h1>

        {/* ---------------- STEP TRACKER ---------------- */}
        <div className="flex justify-between items-center px-4">
          {steps.map((label, index) => (
            <div key={index} className="flex-1 text-center">
              <div
                className={`mx-auto w-10 h-10 flex items-center justify-center rounded-full text-[16px] font-bold transition ${index === step
                  ? "bg-red text-white scale-110 shadow-lg"
                  : index < step
                    ? "bg-green text-white"
                    : "bg-blue text-white"
                  }`}
              >
                {index + 1}
              </div>
              <p
                className={`text-[15px] mt-1 font-medium ${index === step ? "text-red" : "text-blue"
                  }`}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* ---------------- FORM CARD ---------------- */}
        <div className="bg-white shadow-2xl rounded-2xl px-10 py-12 space-y-10">
          {/* ---------------- STEP 1 : BASIC INFO ---------------- */}
          {step === 0 && (
            <>
              <h2 className="text-[30px] font-bold text-blue border-b border-black pb-1">
                Basic Info
              </h2>

              <label className="flex items-center gap-4 w-fit cursor-pointer group">
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setCover(e.target.files[0])}
                />

                {/* Choose file button */}
                <div
                  className="flex items-center gap-2 border-2 border-dashed border-blue
             rounded-lg px-4 py-2 text-[16px] text-black font-medium
             group-hover:border-red transition"
                >
                  <ImageIcon size={20} className="text-blue" />
                  <span>Choose file</span>
                </div>

                {/* Preview / Placeholder */}
                <div className="h-20 w-20 rounded-lg border border-black bg-white
  flex items-center justify-center overflow-hidden shadow-sm">
                  {cover ? (
                    <img
                      src={URL.createObjectURL(cover)}
                      alt="Cover Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : existingCover ? (
                    <img
                      src={existingCover}
                      alt="Existing Cover"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-[14px] text-black text-center leading-tight">
                      Cover<br />Preview
                    </span>
                  )}
                </div>
              </label>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[18px] font-medium text-black">Title</label>
                  <input
                    className="w-full px-4 py-2 border rounded-lg"
                    value={data.title}
                    onChange={(e) => setData({ ...data, title: e.target.value })}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[18px] font-medium text-black">Category</label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg text-[16px]"
                    value={data.category}
                    onChange={(e) => setData({ ...data, category: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.name} value={createSlug(cat.name)}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[18px] font-medium text-black">Description</label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={4}
                    value={data.description}
                    onChange={(e) =>
                      setData({ ...data, description: e.target.value })
                    }
                  />
                </div>
              </div>
            </>
          )}

          {/* ---------------- STEP 2 : DETAILS ---------------- */}
          {step === 1 && (
            <>
              <h2 className="text-[30px] font-bold text-blue border-b border-black pb-2">
                Details
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {["service", "architech", "client", "area", "location"].map((f) => (
                  <div key={f} className="flex flex-col gap-1">
                    <label className="text-[16px] font-medium text-black capitalize">
                      {f}
                    </label>
                    <input
                      className="px-4 py-2 border rounded-lg"
                      value={data[f]}
                      onChange={(e) =>
                        setData({ ...data, [f]: e.target.value })
                      }
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-1">
                  <label className="text-[16px] font-medium text-black">Status</label>
                  <select
                    className="px-4 py-2 border rounded-lg"
                    value={data.status}
                    onChange={(e) =>
                      setData({ ...data, status: e.target.value })
                    }
                  >
                    <option>Ongoing</option>
                    <option>Pending</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* ---------------- STEP 3 : GALLERY ---------------- */}
          {step === 2 && (
            <>
              <h2 className="text-[30px] font-bold text-blue border-b border-black pb-2">
                Upload Images
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {images.map((img, i) => (
                  <div key={i} className="space-y-2">
                    <label className="text-[16px] font-medium text-black">
                      Image {i + 1}
                    </label>

                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-3 border-2 border-dashed border-blue rounded-lg px-4 py-3 cursor-pointer hover:border-red transition">
                        <ImageIcon size={20} className="text-blue" />

                        <span className="text-[16px] text-black font-medium">Choose file</span>
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) => {
                            const copy = [...images];
                            copy[i] = e.target.files[0];
                            setImages(copy);
                          }}
                        />
                      </label>

                      {img ? (
                        <img
                          src={URL.createObjectURL(img)}
                          alt=""
                          className="h-30 w-24 object-cover rounded-lg border shadow-md hover:scale-105 transition"
                        />
                      ) : existingImages[i] ? (
                        <img
                          src={existingImages[i]}
                          alt={`existing-${i}`}
                          className="h-30 w-24 object-cover rounded-lg border shadow-md"
                        />
                      ) : null}

                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setImages([...images, null])}
                className="text-[16px] text-blue font-medium hover:text-red"
              >
                + Add more images
              </button>
            </>
          )}

          {/* ---------------- STEP 4 : REVIEW ---------------- */}
          {step === 3 && (
            <>
              <h2 className="text-[30px] font-bold text-blue border-b border-black pb-2 mb-6">
                Review
              </h2>

              <div className="space-y-6">
                {/* PROJECT DETAILS */}
                <div className="border border-black rounded-lg shadow-sm text-[16px] p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-black text-[18px]">Project Details</h3>
                    <button
                      type="button"
                      onClick={() => goTo(0)}
                      className="text-blue text-[16px] hover:text-red"
                    >
                      Edit
                    </button>
                  </div>

                  {/* Cover Image */}
                  <div className="gap-60 mb-3">
                    <span className="font-medium text-[18px]">Cover Image:</span>
                    {cover ? (
                      <img
                        src={URL.createObjectURL(cover)}
                        alt="Cover"
                        className="h-40 w-40 object-cover rounded-xl border-2 border-green shadow-md hover:scale-100 transition"
                      />
                    ) : existingCover ? (
                      <img
                        src={existingCover}
                        alt="Cover"
                        className="h-40 w-40 object-cover rounded-xl border-2 border-blue hover:border-red shadow-md hover:scale-100 transition"
                      />
                    ) : (
                      <p className="text-black text-[18px]">No cover image</p>
                    )}

                  </div>

                  {/* Title + Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-black mb-3">
                    <div>
                      <span className="font-medium">Title:</span>{" "}
                      {data.title || <span className="text-black">—</span>}
                    </div>
                    {/* ✅ FIXED CATEGORY DISPLAY */}
                    <div>
                      <span className="font-medium">Category:</span>{" "}
                      {selectedCategory || <span className="text-black">—</span>}
                    </div>
                  </div>

                  {/* Full-width Description */}
                  <div className="text-black leading-relaxed">
                    <span className="font-medium">Description:</span>
                    <p className="mt-1 text-black whitespace-pre-line">
                      {data.description || <span className="text-black">—</span>}
                    </p>
                  </div>
                </div>

                {/* DETAILS */}
                <div className="border border-black rounded-lg shadow-sm p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-[18px]">Details</h3>
                    <button
                      type="button"
                      onClick={() => goTo(1)}
                      className="text-blue text-[16px] hover:text-red"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-[16px] text-black">
                    {["service", "architech", "client", "area", "location", "status"].map(
                      (key) => (
                        <div key={key}>
                          <span className="font-medium capitalize">{key}:</span>{" "}
                          {data[key] || <span className="text-black">—</span>}
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* IMAGES */}
                <div className="border border-black rounded-lg shadow-sm p-5">
                  <h3 className="font-bold text-black text-[18px] mb-5">Images</h3>

                  <div className="flex flex-wrap justify-center gap-4">
                    {Array.from({
                      length: Math.max(images.length, existingImages.length),
                    }).map((_, i) => {
                      // new image replaces old one
                      if (images[i]) {
                        return (
                          <img
                            key={`new-${i}`}
                            src={URL.createObjectURL(images[i])}
                            alt={`gallery-new-${i}`}
                            className="h-40 w-34 object-cover rounded-lg border-2 border-green shadow-sm hover:scale-105 transition"
                          />
                        );
                      }

                      // fallback to existing image
                      if (existingImages[i]) {
                        return (
                          <img
                            key={`existing-${i}`}
                            src={existingImages[i]}
                            alt={`gallery-existing-${i}`}
                            className="h-40 w-34 object-cover rounded-lg border-2 border-blue hover:border-red shadow-sm hover:scale-105 transition"
                          />
                        );
                      }

                      return null;
                    })}

                    {/* Empty state */}
                    {images.filter(Boolean).length === 0 &&
                      existingImages.length === 0 && (
                        <p className="text-[18px] text-black">
                          No gallery images available
                        </p>
                      )}
                  </div>
                </div>

              </div>
            </>
          )}

          {/* ---------------- NAV BUTTONS ---------------- */}
          <div className="flex justify-between pt-6">
            {step > 0 && (
              <button
                onClick={back}
                className="px-5 py-2 bg-blue text-white rounded-lg transition text-[16px]"
              >
                Back
              </button>
            )}

            {step < 3 ? (
              <button
                onClick={next}
                className="ml-auto px-6 py-2 bg-red text-white rounded-lg transition text-[16px]"
              >
                Next
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={loading} // ✅ Disabled while loading
                className={`ml-auto px-6 py-2 bg-green text-white rounded-lg transition text-[16px] ${loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
              >
                {loading
                  ? id
                    ? "Updating..."
                    : "Uploading..."
                  : id
                    ? "Update"
                    : "Upload"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
