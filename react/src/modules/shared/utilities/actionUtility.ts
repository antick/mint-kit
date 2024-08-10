// Interface for creating action to maintain the parameter consistency
const action = (type: string, payload = undefined, error = false, meta = null) => ({
  type, payload, error, meta,
});

export {
  action,
};
