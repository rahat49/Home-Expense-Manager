import { TestBed } from '@angular/core/testing';

import { TableDatasourceService } from './table-datasource.service';

describe('TableDatasourceService', () => {
  let service: TableDatasourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableDatasourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
