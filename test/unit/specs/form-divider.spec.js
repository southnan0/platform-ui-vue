import { createTest, destroyVM } from '../util';
import FormDivider from 'packages/form-divider';

describe('FormDivider',()=>{
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(FormDivider, {
      title: 'form-divider-test'
    }, true);
    let formDividerEl = vm.$el;
    console.info(formDividerEl)
    // expect(formDividerEl).to.be.true;
  });
})
