import * as ui from './ui';
export * from './ui';

export async function runUI() {
    await ui.runUI();
    document.body.style.backgroundColor = '#EFE';
}
