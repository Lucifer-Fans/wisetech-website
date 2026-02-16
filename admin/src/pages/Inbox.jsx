import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Trash2, Eye, Search, Calendar } from "lucide-react";

export default function Inbox() {
  const [enquiries, setEnquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [dateInputOpen, setDateInputOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectMenuOpen, setSelectMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchData = async () => {
    let url = "http://localhost:5000/api/enquiries";
    if (filter === "starred") url += "?starred=true";
    else if (filter === "unread") url += "?viewed=false";

    const res = await axios.get(url);
    const sorted = res.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setEnquiries(sorted);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterDate]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete enquiry?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9e312c",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/enquiries/${id}`);

      Swal.fire("Deleted!", "Enquiry has been deleted.", "success");
      fetchData();
    } catch (error) {
      Swal.fire("Error", "Failed to delete enquiry", "error");
    }
  };

  const handleView = async (id) => {
    await axios.put(`http://localhost:5000/api/enquiries/${id}/view`);

    navigate(`/enquiry/${id}`, {
      state: {
        from: {
          currentPage,
          searchQuery,
          filterDate,
          filter,
          sortOption,
          itemsPerPage,
        },
      },
    });
  };

  const handleStarToggle = async (id, currentStatus) => {
    await axios.put(`http://localhost:5000/api/enquiries/${id}/star`, {
      starred: !currentStatus,
    });
    fetchData();
  };

  const handleBulkDelete = async () => {
    const result = await Swal.fire({
      title: `Delete ${selectedIds.length} enquiries?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9e312c",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete all",
    });

    if (!result.isConfirmed) return;

    try {
      await Promise.all(
        selectedIds.map((id) =>
          axios.delete(`http://localhost:5000/api/enquiries/${id}`)
        )
      );

      setSelectedIds([]);
      Swal.fire("Deleted!", "Selected enquiries have been deleted.", "success");
      fetchData();
    } catch (error) {
      Swal.fire("Error", "Failed to delete selected enquiries", "error");
    }
  };

  const handleBulkView = async () => {
    await Promise.all(
      selectedIds.map((id) =>
        axios.put(`http://localhost:5000/api/enquiries/${id}/view`)
      )
    );
    setSelectedIds([]);
    fetchData();
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredEnquiries.map((e) => e._id));
    }
  };

  const handleSelectionMenuClick = (option) => {
    switch (option) {
      case "all":
        setSelectedIds(filteredEnquiries.map((e) => e._id));
        break;
      case "none":
        setSelectedIds([]);
        break;
      case "read":
        setSelectedIds(
          filteredEnquiries.filter((e) => e.viewed).map((e) => e._id)
        );
        break;
      case "unread":
        setSelectedIds(
          filteredEnquiries.filter((e) => !e.viewed).map((e) => e._id)
        );
        break;
      case "starred":
        setSelectedIds(
          filteredEnquiries.filter((e) => e.starred).map((e) => e._id)
        );
        break;
      case "unstarred":
        setSelectedIds(
          filteredEnquiries.filter((e) => !e.starred).map((e) => e._id)
        );
        break;
      default:
        break;
    }
    setSelectMenuOpen(false);
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    if (location.state?.from) {
      const {
        currentPage,
        searchQuery,
        filterDate,
        filter,
        sortOption,
        itemsPerPage,
      } = location.state.from;

      if (currentPage) setCurrentPage(currentPage);
      if (searchQuery) setSearchQuery(searchQuery);
      if (filterDate) setFilterDate(filterDate);
      if (filter) setFilter(filter);
      if (sortOption) setSortOption(sortOption);
      if (itemsPerPage) setItemsPerPage(itemsPerPage);

      // Clear state so it doesn’t repeat on refresh
      navigate(location.pathname, { replace: true });
    }
  }, []);


  useEffect(() => {
    fetchData();
  }, [filter]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSelectMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredEnquiries = enquiries
    .filter((enquiry) => {
      if (filterDate) {
        const enquiryDate = new Date(enquiry.createdAt);
        const selectedDate = new Date(filterDate);
        return (
          enquiryDate.getFullYear() === selectedDate.getFullYear() &&
          enquiryDate.getMonth() === selectedDate.getMonth() &&
          enquiryDate.getDate() === selectedDate.getDate()
        );
      }

      const query = searchQuery.trim().toLowerCase();
      const formattedDate = formatDate(enquiry.createdAt).toLowerCase();
      const rawDate = enquiry.createdAt.toLowerCase();

      return (
        `${enquiry.name || ""}`.toLowerCase().includes(query) ||
        (enquiry.email || "").toLowerCase().includes(query) ||
        (enquiry.purpose || "").toLowerCase().includes(query) ||
        formattedDate.includes(query) ||
        rawDate.includes(query)
      );
    })

    .sort((a, b) => {
      if (sortOption === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOption === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortOption === "az") return a.name.localeCompare(b.name);
      if (sortOption === "za") return b.name.localeCompare(a.name);
      return 0;
    });

  const allSelected =
    selectedIds.length === filteredEnquiries.length &&
    filteredEnquiries.length > 0;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEnquiries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);

  return (
    <div className="w-full">
      <h1 className="text-[30px] font-bold mb-4">Inbox</h1>

      <div className="max-w-7xl">

        {/* Top Controls */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-4">

          {/* Left Controls */}
          <div className="flex flex-wrap items-center gap-4 relative">

            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
              className="w-4 h-4"
            />

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setSelectMenuOpen(!selectMenuOpen)}
                className="w-5 h-5 border rounded flex items-center justify-center"
              >
                <span className="text-[18px]">▾</span>
              </button>

              {selectMenuOpen && (
                <div className="absolute left-0 mt-2 w-36 bg-white border rounded z-20">
                  {["All", "None", "Read", "Unread", "Starred", "Unstarred"].map(
                    (label) => (
                      <button
                        key={label}
                        onClick={() =>
                          handleSelectionMenuClick(label.toLowerCase())
                        }
                        className="w-full text-left px-4 py-2 text-[15px] hover:bg-blue text-black"
                      >
                        {label}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-[15px] px-2 py-1 border rounded bg-white"
            >
              <option value="all">📥 All</option>
              <option value="starred">⭐ Starred</option>
              <option value="unread">👁 Unread</option>
            </select>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="text-[15px] px-2 py-1 border rounded bg-white"
            >
              <option value="newest">🆕 Newest First</option>
              <option value="oldest">📜 Oldest First</option>
              <option value="az">🔤 A-Z</option>
              <option value="za">🔡 Z-A</option>
            </select>

            <button
              onClick={fetchData}
              className="text-[15px] border px-2 py-1 rounded"
            >
              🔄 Refresh
            </button>
          </div>

          {/* Search + Date */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full xl:w-96">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-black" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mail"
                disabled={!!filterDate}
                className={`pl-10 pr-4 py-2 w-full bg-white border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${filterDate ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              />
            </div>

            <div className="flex items-center gap-2">
              {!dateInputOpen && !filterDate && (
                <button
                  onClick={() => setDateInputOpen(true)}
                  className="p-2 rounded"
                >
                  <Calendar size={25} />
                </button>
              )}

              {(dateInputOpen || filterDate) && (
                <>
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="border rounded-full px-3 py-2"
                  />
                  {filterDate && (
                    <button
                      onClick={() => {
                        setFilterDate("");
                        setDateInputOpen(false);
                      }}
                      className="text-black text-[15px]"
                    >
                      Clear
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between bg-white border px-6 py-3 rounded mb-1">
            <p className="text-[16px] text-black">
              {selectedIds.length} selected
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleBulkView}
                className="bg-blue text-white px-3 py-1 rounded hover:bg-red text-[15px]"
              >
                Mark as Viewed
              </button>
              <button
                onClick={handleBulkDelete}
                className="bg-red text-white px-3 py-1 rounded text-[15px]"
              >
                Delete Selected
              </button>
            </div>
          </div>
        )}

        {/* Mail List */}
        <div className="bg-white rounded divide-y overflow-hidden">
          {currentItems.length === 0 ? (
            <p className="text-center py-8 text-black text-[18px]">
              No enquiries found.
            </p>
          ) : (
            currentItems.map((enquiry) => {
              const isChecked = selectedIds.includes(enquiry._id);
              return (
                <div
                  key={enquiry._id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 gap-3 hover:bg-gray-50 transition-all ${!enquiry.viewed
                      ? "bg-blue/50 font-medium"
                      : "text-black"
                    }`}
                >
                  <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleSelect(enquiry._id)}
                      className="w-4 h-4"
                    />

                    <button
                      onClick={() =>
                        handleStarToggle(enquiry._id, enquiry.starred)
                      }
                      className={`text-lg ${enquiry.starred
                          ? "text-yellow"
                          : "text-black"
                        }`}
                    >
                      {enquiry.starred ? "★" : "☆"}
                    </button>

                    <div className="min-w-0">
                      <p className="truncate text-[18px]">
                        {enquiry.name}
                        <span className="block sm:inline sm:text-[16px] text-black sm:ml-2">
                          ({enquiry.email})
                        </span>
                      </p>
                      <p className="sm:text-[16px] truncate">
                        {enquiry.purpose}
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-[16px] text-black whitespace-nowrap">
                    {formatDate(enquiry.createdAt)}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleView(enquiry._id)}
                      className="text-blue hover:text-red"
                    >
                      <Eye size={22} />
                    </button>
                    <button
                      onClick={() => handleDelete(enquiry._id)}
                      className="text-red hover:text-blue"
                    >
                      <Trash2 size={22} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-[16px]">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>

            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border px-2 py-1 rounded"
            >
              {[5, 10, 20, 50].map((num) => (
                <option key={num} value={num}>
                  {num} per page
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}