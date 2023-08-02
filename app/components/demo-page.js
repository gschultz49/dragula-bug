import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Page extends Component {
  @tracked
  arr = [1, 2, 3, 4, 5];

  @tracked
  arr2 = [
    { name: '1' },
    { name: '2' },
    { name: '3' },
    { name: '4' },
    { name: '5' },
  ];

  @action
  reverseArr() {
    this.arr2 = this.arr2.reverse();
  }

  moveBlock(arr, originalIndex, newIndex) {
    function moveIndex(arr, fromIndex, toIndex) {
      let element = arr[fromIndex];
      let sliced = arr.slice(0, fromIndex).concat(arr.slice(fromIndex + 1));
      let final = [
        ...sliced.slice(0, toIndex),
        element,
        ...sliced.slice(toIndex),
      ];
      return final;
    }
    return moveIndex([...arr], originalIndex, newIndex);
  }

  @action
  initDragula(dragulaInstance) {
    console.log('initDragula');
    dragulaInstance.on('drop', (droppedElement, target, source) => {
      console.log('inside drop event', this.arr2);
      // identify the index to insert the component at
      const indexToInsertAt = [...target.children].indexOf(droppedElement);
      if (indexToInsertAt === -1) {
        throw new Error('Could not find the index of the dropped element');
      }
      if (target === source) {
        // Dragging within the Config Tray
        const originalConfigBlockId = droppedElement.getAttribute(
          'data-test-email-builder-config-block'
        );
        const originalIndex = this.arr2.findIndex(
          (block) => block.name == originalConfigBlockId
        );

        // Move the component to the new position within the Config Tray
        // this.arr2 = this.moveBlock(this.arr2, originalIndex, indexToInsertAt);
        this.arr2 = [this.arr2[4], this.arr2[3], this.arr2[2], this.arr2[1], this.arr2[0]];
      }
    });
  }
}
