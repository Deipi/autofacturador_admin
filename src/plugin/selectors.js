export const rowSelector = (state, { griddleKey }) => ({
	rowData: state.get('data')
	.find(r => r.get('griddleKey') === griddleKey),
});
