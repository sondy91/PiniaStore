import { ref, reactive } from 'vue';
export function piniaHistoryPlugin({pinia, app, store, options}) {
  if(!options.historyEnabled) return;
  const history = reactive([]);
  const future = reactive([]);
  const updatingHistory = ref(false);
  history.push(JSON.stringify(store.$state));
  store.$subscribe((mutation, state) => {
    if(!updatingHistory.value) {
      history.push(JSON.stringify(state));
      future.splice(0, future.length);
    }
  })
  return {
    history,
    future,
    redo: () => {
      const latestState = future.pop();
      if (!latestState) return;
      updatingHistory.value = true;
      history.push(latestState);
      store.$state = JSON.parse(latestState);
      updatingHistory.value = false;
    },
    undo: () => {
      if (history.length === 1) return;
      updatingHistory.value = true;
      future.push(history.pop());
      store.$state = JSON.parse(history.at(-1));
      updatingHistory.value = false;
    },
  };
}
