const CheckBox = ({ label }: { label: any }) => (
  <div className="flex items-start text-sm">
    <div className="flex items-center">
      <input type="checkbox" className="mt-1 form-checkbox border-gray-400 h-4 w-4 text-teal-600"/>
    </div>
    <label className="ml-3 text-gray-700">{label}</label>
  </div>
);

export default CheckBox;
