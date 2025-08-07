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
const actionTypes = ["Pending", "Approved", "Rejected"]; 

export const dummyProducts = Array.from({ length: 200 }, (_, i) => {
  const shuffled = [...materialTypesList].sort(() => 0.5 - Math.random());
  const materials = shuffled.slice(0, 2 + (i % 2)); // 2 or 3 materials

  // Pick a random action
  const action = actionTypes[Math.floor(Math.random() * actionTypes.length)];

  return {
    id: i + 1,
    name: `Classic Diamond Ring`,
    sku: `RG-DIA-${(i + 1).toString().padStart(3, "0")}`,
    sellerName: `Seller Name`,
    usedBy: `${5 + (i % 3)} Sellers`,
    materials,
    weight: `${(4.5 + (i % 3) * 0.1).toFixed(1)}g`,
    category: "Rings > Sub Category",
    price: `${(75000).toLocaleString()}`,
    views: 1000 + i * 2,
    availability: i % 4 === 1 ? "Out of Stock" : "In Stock",
    action, // NEW FIELD
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



