export const CheckboxComponent = ({
  label,
  name,
  checked,
  disabled,
  handleCheckbox,
}) => {
  return (
    <div
      className="border_checkbox"
      //   style={{ borderColor: checked === true ? "red" : "red" }}
    >
      <div class="checkbox-wrapper-65">
        <label for="cbk1-65">
          <input
            type="checkbox"
            id="cbk1-65"
            checked={checked ? checked : false}
            name={name}
            disabled={disabled}
            onChange={handleCheckbox}
          />
          <span class="cbx">
            <svg width="12px" height="11px" viewBox="0 0 12 11">
              <polyline points="1 6.29411765 4.5 10 11 1"></polyline>
            </svg>
          </span>
          <span>{label}</span>
        </label>
      </div>
    </div>
  );
};
