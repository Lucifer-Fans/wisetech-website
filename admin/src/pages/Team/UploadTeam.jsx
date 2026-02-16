import { useState } from "react";
import Swal from "sweetalert2";
import api from "../../api/axios";
import { Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = ["Info", "Images", "Preview"];

export default function UploadTeam() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    category: "sport",
    date: "",
  });

  const [images, setImages] = useState(Array(5).fill(null));

  /* ---------------- VALIDATION ---------------- */
  const validateStep = () => {
    if (step === 0) {
      if (!data.title || !data.category || !data.date) {
        Swal.fire("Error", "All fields are required", "error");
        return false;
      }
    }

    if (step === 1) {
      if (images.filter(Boolean).length < 1) {
        Swal.fire("Error", "Minimum 1 images required", "error");
        return false;
      }
    }
    return true;
  };

  const next = () => {
    if (!validateStep()) return;
    setStep((s) => s + 1);
  };

  const back = () => setStep((s) => s - 1);

  /* ---------------- SUBMIT ---------------- */
  const submit = async () => {
    if (loading) return; // ✅ Prevent multiple clicks

    if (images.filter(Boolean).length < 1) {
      return Swal.fire("Error", "Minimum 1 images required", "error");
    }

    setLoading(true); // ✅ Start loading

    const form = new FormData();
    form.append("title", data.title);
    form.append("category", data.category);
    form.append("date", data.date);

    images.forEach((img) => {
      if (img) form.append("images", img);
    });

    try {
      await api.post("/team", form, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      Swal.fire("Uploaded", "Team fun uploaded", "success");
      navigate("/team");
    } catch (error) {
      Swal.fire(
        "Error", error.response?.data?.message || "Upload failed", "error"
      );
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <div className="bg-white min-h-screen flex justify-center py-6 px-4">

      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-[30px] font-bold mb-4">Upload Team Fun</h1>

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

          {/* ---------------- STEP 1 ---------------- */}
          {step === 0 && (
            <>
              <h2 className="text-[30px] font-bold text-blue border-b border-black pb-1">
                Team Info
              </h2>

              <div className="flex flex-col gap-4">

                <div className="flex flex-col gap-1">
                  <label className="text-[18px] font-medium text-black">
                    Title
                  </label>
                  <input
                    className="w-full px-4 py-2 border rounded-lg"
                    value={data.title}
                    onChange={(e) =>
                      setData({ ...data, title: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[18px] font-medium text-black">
                    Category
                  </label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg text-[16px] capitalize"
                    value={data.category}
                    onChange={(e) =>
                      setData({ ...data, category: e.target.value })
                    }
                  >
                    <option>sport</option>
                    <option>outing</option>
                    <option>celebration</option>
                    <option>training</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[18px] font-medium text-black">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={data.date}
                    onChange={(e) =>
                      setData({ ...data, date: e.target.value })
                    }
                  />
                </div>

              </div>
            </>
          )}

          {/* ---------------- STEP 2 ---------------- */}
          {step === 1 && (
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
                        <span className="text-[16px] text-black font-medium">
                          Choose file
                        </span>

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

                      {img && (
                        <img
                          src={URL.createObjectURL(img)}
                          alt=""
                          className="h-30 w-24 object-cover rounded-lg border shadow-md hover:scale-105 transition"
                        />
                      )}
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

          {/* ---------------- STEP 3 ---------------- */}
          {step === 2 && (
            <>
              <h2 className="text-[30px] font-bold text-blue border-b border-black pb-2 mb-6">
                Review
              </h2>

              <div className="space-y-6">

                {/* DETAILS */}
                <div className="border border-black rounded-lg shadow-sm p-5 text-[16px]">
                  <h3 className="font-bold text-black text-[18px] mb-4">
                    Team Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-black">
                    <div>
                      <span className="font-medium">Title:</span>{" "}
                      {data.title || "—"}
                    </div>
                    <div>
                      <span className="font-medium">Category:</span>{" "}
                      <span className="capitalize">{data.category || "—"}</span>
                    </div>
                    <div>
                      <span className="font-medium">Date:</span>{" "}
                      {data.date || "—"}
                    </div>
                  </div>
                </div>

                {/* IMAGES */}
                <div className="border border-black rounded-lg shadow-sm p-5">
                  <h3 className="font-bold text-black text-[18px] mb-5">
                    Images
                  </h3>

                  <div className="flex flex-wrap justify-center gap-4">
                    {images.filter(Boolean).map((img, i) => (
                      <img
                        key={i}
                        src={URL.createObjectURL(img)}
                        alt={`review-${i}`}
                        className="h-40 w-34 object-cover rounded-lg border-2 border-green shadow-sm hover:scale-105 transition"
                      />
                    ))}
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

            {step < 2 ? (
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
                {loading ? "Uploading..." : "Upload"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
