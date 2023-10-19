import { createElement } from 'preact';
import { Text } from 'preact-i18n';

import { withIntl } from '../../enhancers';
import { ModalDialog } from '@zimbra-client/components';
import style from './style';

const ConfirmModal = ({ onClose, onAction, zimletStrings, iframeURL }) => {
	return (
		<ModalDialog
			title={zimletStrings.menuItem}
			onAction={onAction}
			cancelButton={false}
			onClose={onClose}
			class={style.modalDialog}
			contentClass={style.modalContent}
			innerClass={style.inner}
			actionLabel="buttons.ok"
		><p><iframe style="width:100%; height:100%; min-height:350px" id="printFrame" name="printFrame" src={iframeURL}/></p>

		</ModalDialog>
	);
};

export default withIntl()(ConfirmModal);
