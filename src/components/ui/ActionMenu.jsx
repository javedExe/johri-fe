import Switch from "./Switch";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";

const ActionMenu = ({
  row,
  handleEdit,
  handleDelete,
  handleStatusToggle,
  // className,
}) => {
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState(null);

  // Calculate menu position above button
  const updateCoords = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top,
        left: rect.left + rect.width / 2,
      });
    }
  };

  useEffect(() => {
    if (open) {
      updateCoords();
      // Attach listeners for window and table scrolls
      window.addEventListener("scroll", updateCoords, true); // capture phase
      window.addEventListener("resize", updateCoords, true);
      return () => {
        window.removeEventListener("scroll", updateCoords, true);
        window.removeEventListener("resize", updateCoords, true);
      };
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      const handleScroll = () => {
        setOpen(false); // Close popup on any scroll event
      };

      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleScroll, true);

      return () => {
        window.removeEventListener("scroll", handleScroll, true);
        window.removeEventListener("resize", handleScroll, true);
      };
    }
  }, [open]);

  // Click outside to close
  useEffect(() => {
    if (!open) return;
    const handleClickAway = (e) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target) &&
        !document.getElementById("action-popup")?.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickAway);
    return () => document.removeEventListener("mousedown", handleClickAway);
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        className="p-1 rounded hover:bg-gray-100"
        onClick={() => setOpen((o) => !o)}
      >
        <BsThreeDots className="w-6 h-6" />
      </button>
      {open &&
        coords &&
        createPortal(
          <div
            id="action-popup"
            className="z-50 fixed bg-white shadow-lg rounded-xl flex items-center gap-5 py-3 px-4"
            style={{
              top: coords.top,
              left: coords.left,
              transform: "translate(-80%, -100%)", // Popup above button
              minWidth: 140,
            }}
          >
            {/* Arrow - bottom of popup */}
            <div
              style={{
                position: "absolute",
                left: "80%",
                bottom: "-8px",
                transform: "translateX(-50%)",
                zIndex: 0,
                filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.12))",
              }}
            >
              <div className="w-4 h-4 bg-white  border-gray-300 rotate-45"></div>
            </div>
            <AiOutlineEdit
              className="w-6 h-6 text-gray-600 hover:text-blue-700 cursor-pointer"
              onClick={() => {
                handleEdit(row);
                setOpen(false);
              }}
            />
            <FiTrash
              className="w-6 h-6 text-gray-600 hover:text-red-500 cursor-pointer"
              onClick={() => {
                handleDelete(row.id);
                setOpen(false);
              }}
            />
            <Switch
              checked={row.status}
              onClick={() => {
                handleStatusToggle(row.id, row.status);
                setOpen(false);
              }}
            />
          </div>,
          document.body
        )}
    </>
  );
};

export default ActionMenu;
