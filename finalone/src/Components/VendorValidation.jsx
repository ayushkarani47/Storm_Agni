import React, { useState } from 'react';

const VendorValidation = () => {
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: 'Vendor 1',
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Vendor 2',
      status: 'Pending',
    },
    // Add more vendor objects as needed
  ]);

  const handleValidate = (vendorId) => {
    // Simulate updating the vendor status to "Validated" in the backend
    const updatedVendors = vendors.map((vendor) =>
      vendor.id === vendorId ? { ...vendor, status: 'Validated' } : vendor
    );
    setVendors(updatedVendors);
  };

  const handleReject = (vendorId) => {
    // Simulate updating the vendor status to "Rejected" in the backend
    const updatedVendors = vendors.map((vendor) =>
      vendor.id === vendorId ? { ...vendor, status: 'Rejected' } : vendor
    );
    setVendors(updatedVendors);
  };

  return (
    <div>
      <h1>Vendor Validation</h1>
      <table className="w-full table-fixed">
        <thead>
          <tr>
            <th className="w-1/2">Vendor Name</th>
            <th className="w-1/4">Status</th>
            <th className="w-1/4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor.name}</td>
              <td>{vendor.status}</td>
              <td>
                {vendor.status === 'Pending' && (
                  <div className="space-x-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleValidate(vendor.id)}
                    >
                      Validate
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleReject(vendor.id)}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorValidation;
