package test.javaapi;

import com.db.grad.javaapi.repository.BondRepositoryTest;
import com.db.grad.javaapi.repository.BookRepositoryTest;
import com.db.grad.javaapi.repository.UserRepositoryTest;
import com.db.grad.javaapi.service.BondServiceTest;
import com.db.grad.javaapi.service.BookServiceTest;
import com.db.grad.javaapi.service.UserServiceTest;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
		BondRepositoryTest.class,
		BookRepositoryTest.class,
		UserRepositoryTest.class,
		BondServiceTest.class,
		BookServiceTest.class,
		UserServiceTest.class
		// Add other test classes here
})
public class JavaApiApplicationTests{
}