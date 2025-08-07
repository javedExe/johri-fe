const dummyData = Array.from({ length: 200 }, (_, i) => ({
  businessName: `Business ${i + 1}`,
  businessEmail: `business${i + 1}@example.com`,
  businessPhone: `12345678${(90 + i).toString().padStart(2, "0")}`,
  contactName: `Contact Person ${i + 1}`,
  contactPhone: `98765432${(10 + i).toString().padStart(2, "0")}`,
  contactEmail: `contact${i + 1}@example.com`,
  products: 100 + i * 5,
  activeOffers: 10 + (i % 5),
  role: i % 2 === 0 ? "manufacturer" : "retailer",
  status: i % 3 === 0 ? "inactive" : "active",
}));

export default dummyData;




// Dummy data for Product list

const materialTypesList = ["Silver", "Gold", "Platinum", "Gemstone", "Diamond"];

export const dummyProducts = Array.from({ length: 200 }, (_, i) => {
  // Shuffle and pick random 2-3 materials for variety
  const shuffled = [...materialTypesList].sort(() => 0.5 - Math.random());
  const materials = shuffled.slice(0, 2 + (i % 2)); // 2 or 3 materials

  return {
    id: i + 1,
    name: `Classic Diamond Ring`,
    sku: `RG-DIA-${(i + 1).toString().padStart(3, "0")}`,
    // sellerName: `Seller ${i + 1}`,
    sellerName: `Seller Name`,
    usedBy: `${5 + (i % 3)} Sellers`,
    materials,
    weight: `${(4.5 + (i % 3) * 0.1).toFixed(1)}g`,
    category: "Rings > Sub Category",
    price: `${(75000).toLocaleString()}`,
    views: 1000 + i * 2,
    availability: i % 4 === 1 ? "Out of Stock" : "In Stock",
  };
});

// ₹


// Dummy Data for Package Management

export const dummyPackages = [
  {
    id: 1,
    name: "Basic Plan",
    type: "Free",
    price: 0,
    targetAudience: "End User",
    validityDays: 30,
    features: ["Email Support", "Limited Access", "Feature 3", "Feature 5"],
    status: "Active"
  },
  {
    id: 2,
    name: "Pro Plan",
    type: "Paid",
    price: 75000,
    targetAudience: "Retailer",
    validityDays: 30,
    features: ["Email Support", "Limited Access", "Feature 3", "Feature 5"],
    status: "Active"
  },
  {
    id: 3,
    name: "Premium Plan",
    type: "Paid",
    price: 75000,
    targetAudience: "Brand",
    validityDays: 30,
    features: ["Email Support", "Limited Access", "Feature 3", "Feature 5"],
    status: "Inactive"
  },
  {
    id: 4,
    name: "Gold Plan",
    type: "Paid",
    price: 999,
    targetAudience: "Enterprise",
    validityDays: 30,
    features: ["Priority Support", "Extended KM Range"],
    status: "Active"
  }
];



export const indianStatesAndUTs = [
  { name: "Andaman and Nicobar Islands", value: "andaman-and-nicobar-islands" },
  { name: "Andhra Pradesh", value: "andhra-pradesh" },
  { name: "Arunachal Pradesh", value: "arunachal-pradesh" },
  { name: "Assam", value: "assam" },
  { name: "Bihar", value: "bihar" },
  { name: "Chandigarh", value: "chandigarh" },
  { name: "Chhattisgarh", value: "chhattisgarh" },
  { name: "Dadra and Nagar Haveli and Daman and Diu", value: "dadra-and-nagar-haveli-and-daman-and-diu" },
  { name: "Delhi", value: "delhi" },
  { name: "Goa", value: "goa" },
  { name: "Gujarat", value: "gujarat" },
  { name: "Haryana", value: "haryana" },
  { name: "Himachal Pradesh", value: "himachal-pradesh" },
  { name: "Jammu and Kashmir", value: "jammu-and-kashmir" },
  { name: "Jharkhand", value: "jharkhand" },
  { name: "Karnataka", value: "karnataka" },
  { name: "Kerala", value: "kerala" },
  { name: "Ladakh", value: "ladakh" },
  { name: "Lakshadweep", value: "lakshadweep" },
  { name: "Madhya Pradesh", value: "madhya-pradesh" },
  { name: "Maharashtra", value: "maharashtra" },
  { name: "Manipur", value: "manipur" },
  { name: "Meghalaya", value: "meghalaya" },
  { name: "Mizoram", value: "mizoram" },
  { name: "Nagaland", value: "nagaland" },
  { name: "Odisha", value: "odisha" },
  { name: "Puducherry", value: "puducherry" },
  { name: "Punjab", value: "punjab" },
  { name: "Rajasthan", value: "rajasthan" },
  { name: "Sikkim", value: "sikkim" },
  { name: "Tamil Nadu", value: "tamil-nadu" },
  { name: "Telangana", value: "telangana" },
  { name: "Tripura", value: "tripura" },
  { name: "Uttar Pradesh", value: "uttar-pradesh" },
  { name: "Uttarakhand", value: "uttarakhand" },
  { name: "West Bengal", value: "west-bengal" }
];



