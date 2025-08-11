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



// Dummy Data for Invoice Management

const orderTypes = ["Wholesale", "Retail", "Online"];
const sellerTypes = ["Individual", "Company", "Agency"];
const sellerNames = ["Seller Name", "John Doe", "ABC Traders", "XYZ Supplies"];
const statuses = ["Paid", "Pending", "Overdue", "Cancelled"];

export const dummyInvoice = Array.from({ length: 200 }, (_, i) => {
  // Random values
  const orderType = orderTypes[Math.floor(Math.random() * orderTypes.length)];
  const sellerType = sellerTypes[Math.floor(Math.random() * sellerTypes.length)];
  const sellerName = sellerNames[Math.floor(Math.random() * sellerNames.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  // Fake transaction ID format
  const transactionId = `GSV${Math.floor(100000000 + Math.random() * 900000000)}UI`;

  // Random date
  const date = new Date(
    2020,
    Math.floor(Math.random() * 12), // month
    Math.floor(Math.random() * 28) + 1, // day
    Math.floor(Math.random() * 24), // hour
    Math.floor(Math.random() * 60) // minute
  ).toLocaleString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });

  return {
    transactionId,
    orderType,
    sellerType,
    sellerName,
    dateTime: date,
    amount: `$${(Math.random() * 900 + 100).toFixed(2)}`, // $100–$1000
    status,
    actions: ["view", "download"] // placeholder
  };
});






// Dummy Data for User


function generateDummyUsers(count = 200) {
  const firstNames = ["Ramesh", "Priya", "Amit", "Sonia", "Raj", "Neha", "Kiran", "Arjun", "Pooja", "Manish"];
  const lastNames = ["Gupta", "Sharma", "Verma", "Patel", "Singh", "Iyer", "Reddy", "Chopra", "Kumar", "Das"];
  const statuses = ["Active", "Inactive"];

  const users = [];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;

    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`;

    const phoneNumber = "1234567890";
    // const phoneNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

    const status = statuses[Math.floor(Math.random() * statuses.length)];

    users.push({
      id: i + 1,
      name,
      email,
      phoneNumber,
      status
    });
  }

  return users;
}

export const dummyUser = generateDummyUsers();




